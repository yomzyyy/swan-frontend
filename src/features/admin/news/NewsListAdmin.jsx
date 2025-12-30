import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminTable from '../../../components/admin/AdminTable';
import ConfirmDialog from '../../../components/admin/ConfirmDialog';
import { getAllArticles, deleteArticle } from './newsAdminService';
import { formatNewsDate } from '../../../utils/dateFormatter';

const NewsListAdmin = () => {
  const [articles, setArticles] = useState([]);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const allArticles = await getAllArticles();
      setArticles(allArticles);
    } catch (error) {
      console.error('Failed to load articles:', error);
      setArticles([]);
    }
  };

  const handleEdit = (article) => {
    navigate(`/admin/news/edit/${article.id}`);
  };

  const handleDeleteClick = (article) => {
    setArticleToDelete(article);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (articleToDelete) {
      const result = await deleteArticle(articleToDelete.id);
      if (result.success) {
        loadArticles();
        setDeleteConfirmOpen(false);
        setArticleToDelete(null);
      } else {
        alert('Failed to delete article: ' + result.error);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmOpen(false);
    setArticleToDelete(null);
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      header: 'Title',
      accessor: 'title',
      render: (article) => (
        <div>
          <p className="text-sm font-medium text-gray-900">{article.title}</p>
          <p className="text-xs text-gray-500">{article.slug}</p>
        </div>
      ),
    },
    {
      header: 'Category',
      accessor: 'category',
      render: (article) => (
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
          {article.category}
        </span>
      ),
    },
    {
      header: 'Date',
      accessor: 'publishedAt',
      render: (article) => (
        <span className="text-sm text-gray-600">{formatNewsDate(article.publishedAt)}</span>
      ),
    },
    {
      header: 'Image',
      accessor: 'image',
      render: (article) => (
        <img
          src={article.image}
          alt={article.title}
          className="w-16 h-10 object-cover rounded"
        />
      ),
    },
  ];

  return (
    <div>
      
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">News Articles</h1>
          <p className="text-gray-600 mt-1">Manage your news content</p>
        </div>
        <button
          onClick={() => navigate('/admin/news/create')}
          className="bg-gradient-to-r from-[#207dff] to-[#00bfff] text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
        >
          + Create Article
        </button>
      </div>

      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#207dff] focus:border-transparent"
        />
      </div>

      
      <AdminTable
        columns={columns}
        data={filteredArticles}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        emptyMessage="No articles found. Create your first article!"
      />

      
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        title="Delete Article"
        message={`Are you sure you want to delete "${articleToDelete?.title}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default NewsListAdmin;
