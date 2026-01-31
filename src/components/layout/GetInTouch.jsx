import { LocationOn, Phone, Email } from '@mui/icons-material';
import { homeDefaults } from '../../constants/homeDefaults';

const GetInTouch = ({ bgColor = 'bg-gray-50', getInTouch: contactProp = {} }) => {
  const d = homeDefaults.getInTouch;
  const badge = contactProp.badge || d.badge;
  const title = contactProp.title || d.title;
  const description = contactProp.description || d.description;
  const address = contactProp.address || d.address;
  const phone = contactProp.phone || d.phone;
  const phone2 = contactProp.phone2 || d.phone2;
  const email = contactProp.email || d.email;

  return (
    <section className={`py-12 ${bgColor}`}>
      <div className="max-w-5xl mx-auto px-8">
        {/* Badge */}
        <div className="text-center mb-6">
          <span className="text-sm font-bold uppercase tracking-wider" style={{color: '#2563eb'}}>
            {badge}
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-black uppercase leading-tight mb-6 text-center" style={{color: '#0D2136'}}>
          {title}
        </h2>

        {/* Description */}
        <p className="text-gray-900 text-base leading-relaxed mb-8 text-center">
          {description}
        </p>

        {/* Contact Info - All in one row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Contact Info - Address */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#2563eb'}}>
              <LocationOn sx={{ fontSize: 24, color: 'white' }} />
            </div>
            <div>
              <p className="text-gray-900 text-base leading-relaxed">
                {address}
              </p>
            </div>
          </div>

          {/* Contact Info - Phone */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#2563eb'}}>
              <Phone sx={{ fontSize: 24, color: 'white' }} />
            </div>
            <div>
              <p className="text-gray-900 text-base leading-relaxed">
                {phone}{phone2 ? `, ${phone2}` : ''}
              </p>
            </div>
          </div>

          {/* Contact Info - Email */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#2563eb'}}>
              <Email sx={{ fontSize: 24, color: 'white' }} />
            </div>
            <div>
              <p className="text-gray-900 text-base leading-relaxed">
                {email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
