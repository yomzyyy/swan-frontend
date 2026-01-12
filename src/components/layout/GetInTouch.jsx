import { LocationOn, Phone, Email } from '@mui/icons-material';

const GetInTouch = ({ bgColor = 'bg-gray-50' }) => {
  return (
    <section className={`py-12 ${bgColor}`}>
      <div className="max-w-5xl mx-auto px-8">
        {/* Badge */}
        <div className="text-center mb-6">
          <span className="text-sm font-bold uppercase tracking-wider" style={{color: '#2563eb'}}>
            Get In Touch
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-black uppercase leading-tight mb-6 text-center" style={{color: '#0D2136'}}>
          We Are Your Reliable Partners for the Best LPG Maritime Solutions
        </h2>

        {/* Description */}
        <p className="text-gray-900 text-base leading-relaxed mb-8 text-center">
          From ship management and technical operations to crew training and safety compliance, we offer a wide range of services that meet the unique needs of the LPG maritime industry.
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
                3F S&L Building, 1500 Roxas Boulevard, Ermita, Manila 1000, Philippines
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
                +63-2-85268718 to 19, +63-2-85239830
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
                info@swan-manila.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
