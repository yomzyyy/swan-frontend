import { useState, useEffect, useRef, type ReactNode } from 'react';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import DragIndicator from '@mui/icons-material/DragIndicator';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { FieldRendererProps } from './types';

interface SortableItemProps {
  id: string;
  label: string;
  onDelete: () => void;
  children: ReactNode;
}

// A single draggable row. The drag listeners live on the handle only, so the
// inputs inside stay fully editable (clicking a field never starts a drag).
function SortableItem({ id, label, onDelete, children }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="border border-gray-200 rounded-lg p-4 relative bg-white">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 touch-none"
            aria-label="Drag to reorder"
            title="Drag to reorder"
          >
            <DragIndicator sx={{ fontSize: 18 }} />
          </button>
          <span className="text-xs font-medium text-gray-500 uppercase">{label}</span>
        </div>
        <button
          type="button"
          onClick={onDelete}
          className="p-1 text-red-500 hover:bg-red-50 rounded"
        >
          <Delete sx={{ fontSize: 16 }} />
        </button>
      </div>
      {children}
    </div>
  );
}

function ArrayObjectsField({ field, value, onChange, renderField }: FieldRendererProps) {
  const items = (value as Record<string, unknown>[]) || [];
  const itemLabel = field.itemLabel || 'Item';

  // Stable per-row ids for drag-and-drop. Deliberately kept OUT of the saved
  // data (the backend schema rejects unknown properties); reordered in lockstep
  // with `items` so drop animations stay smooth.
  const idCounter = useRef(0);
  const makeId = () => `dnd-${idCounter.current++}`;
  const [ids, setIds] = useState<string[]>(() => items.map(makeId));

  // Re-sync only when the list is replaced wholesale from outside (e.g. the
  // modal reopens with a different number of rows). Add/delete/reorder keep the
  // ids in sync inline, so this never fires for those.
  useEffect(() => {
    if (ids.length !== items.length) {
      setIds(items.map(makeId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const updateChild = (index: number, childKey: string, childValue: unknown) => {
    const newArr = [...items];
    newArr[index] = { ...newArr[index], [childKey]: childValue };
    onChange(field.key, newArr);
  };

  const handleDelete = (index: number) => {
    onChange(field.key, items.filter((_, idx) => idx !== index));
    setIds(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleAdd = () => {
    const template: Record<string, string> = {};
    field.fields?.forEach(f => { template[f.key] = ''; });
    onChange(field.key, [...items, template]);
    setIds(prev => [...prev, makeId()]);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = ids.indexOf(active.id as string);
    const newIndex = ids.indexOf(over.id as string);
    if (oldIndex < 0 || newIndex < 0) return;
    onChange(field.key, arrayMove(items, oldIndex, newIndex));
    setIds(prev => arrayMove(prev, oldIndex, newIndex));
  };

  const renderSubFields = (item: Record<string, unknown>, index: number) =>
    field.fields?.map(subField =>
      renderField!(subField, item, (childKey: string, childValue: unknown) =>
        updateChild(index, childKey, childValue)
      )
    );

  const addButton = (
    <button
      type="button"
      onClick={handleAdd}
      className="mt-2 flex items-center gap-1 text-sm text-[#207dff] hover:underline"
    >
      <Add sx={{ fontSize: 16 }} /> Add {itemLabel}
    </button>
  );

  // Non-sortable fields render exactly as before — no behavior change.
  if (!field.sortable) {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4 relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-gray-500 uppercase">{itemLabel} {i + 1}</span>
                <button
                  type="button"
                  onClick={() => handleDelete(i)}
                  className="p-1 text-red-500 hover:bg-red-50 rounded"
                >
                  <Delete sx={{ fontSize: 16 }} />
                </button>
              </div>
              {renderSubFields(item, i)}
            </div>
          ))}
        </div>
        {addButton}
      </div>
    );
  }

  // Guard against the single frame where a wholesale replace makes lengths
  // disagree before the resync effect runs — use temp ids for that frame.
  const rowIds = ids.length === items.length ? ids : items.map((_, i) => `tmp-${i}`);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={rowIds} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {items.map((item, i) => (
              <SortableItem
                key={rowIds[i]}
                id={rowIds[i]}
                label={`${itemLabel} ${i + 1}`}
                onDelete={() => handleDelete(i)}
              >
                {renderSubFields(item, i)}
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
      {addButton}
    </div>
  );
}

export default ArrayObjectsField;
