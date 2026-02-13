import { SEO } from '../../components/common';
import { PAGE_SEO } from '../../constants/seo';

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <SEO {...PAGE_SEO.TERMS} path="/terms-conditions" />
      <div className="max-w-4xl mx-auto px-8">
        <div className="mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Terms and Conditions
          </h1>
          <p className="text-gray-600">
            Last updated: December 9, 2025
          </p>
        </div>

        <div className="bg-white rounded-3xl p-12 shadow-lg space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Agreement to Terms
            </h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms and Conditions constitute a legally binding agreement made between you,
              whether personally or on behalf of an entity ("you") and SWAN Shipping Corporation
              ("Company," "we," "us," or "our"), concerning your access to and use of our services
              and website. You agree that by accessing the Site and using our services, you have read,
              understood, and agreed to be bound by all of these Terms and Conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. Services Description
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              SWAN Shipping Corporation provides comprehensive LPG maritime transport services, including:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>Vessel chartering for LPG transportation</li>
              <li>Terminal operations and management</li>
              <li>Fleet management services</li>
              <li>24/7 operational support and emergency response</li>
              <li>Maritime consulting and technical services</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              All services are subject to availability and are governed by individual service agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. User Obligations
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By using our services, you agree to:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>Provide accurate, current, and complete information</li>
              <li>Comply with all applicable maritime laws and regulations</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Comply with International Maritime Organization (IMO) standards</li>
              <li>Ensure cargo meets safety and regulatory requirements</li>
              <li>Pay all fees and charges in accordance with agreed payment terms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Limitation of Liability
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT SHALL SWAN SHIPPING CORPORATION BE LIABLE FOR:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>Acts of God, war, terrorism, strikes, or other force majeure events</li>
              <li>Delays due to weather conditions or port congestion</li>
              <li>Indirect, incidental, special, consequential, or punitive damages</li>
              <li>Loss of profits, revenue, data, or use</li>
              <li>Damages caused by third-party service providers</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Our liability is limited to the value stated in the individual service agreement,
              subject to applicable maritime law including the Hague-Visby Rules where applicable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Insurance and Indemnification
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              All vessels operated by SWAN Shipping Corporation maintain comprehensive Protection
              and Indemnity (P&I) insurance and hull insurance as required by international maritime standards.
            </p>
            <p className="text-gray-700 leading-relaxed">
              You agree to indemnify and hold harmless SWAN Shipping Corporation from any claims, damages,
              losses, liabilities, and expenses (including legal fees) arising from your cargo, breach of
              these terms, or violation of any laws or regulations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Payment Terms
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Payment terms are specified in individual service agreements. General terms include:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>Payment in advance or as per agreed credit terms</li>
              <li>Late payment may result in interest charges and service suspension</li>
              <li>All fees are in USD unless otherwise specified</li>
              <li>Demurrage and detention charges apply as per agreed rates</li>
              <li>Currency exchange fluctuations may affect final charges</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Safety and Compliance
            </h2>
            <p className="text-gray-700 leading-relaxed">
              SWAN Shipping Corporation operates in full compliance with:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700 mt-4">
              <li>International Maritime Organization (IMO) regulations</li>
              <li>International Safety Management (ISM) Code</li>
              <li>International Ship and Port Facility Security (ISPS) Code</li>
              <li>MARPOL environmental protection standards</li>
              <li>ISO 9001 quality management standards</li>
              <li>All applicable national and international maritime laws</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Termination
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may terminate or suspend access to our services immediately, without prior notice or
              liability, for any reason whatsoever, including without limitation if you breach the Terms.
              Upon termination, your right to use the services will immediately cease.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. Governing Law and Dispute Resolution
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the Philippines,
              without regard to its conflict of law provisions.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Any dispute arising from these Terms or our services shall be resolved through arbitration
              in accordance with the rules of the Philippine Dispute Resolution Center, Inc. (PDRCI).
              Maritime disputes may be subject to admiralty jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. Contact Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="text-gray-900 font-semibold mb-2">SWAN Shipping Corporation</p>
              <p className="text-gray-700">3F S&L Building, 1500 Roxas Boulevard</p>
              <p className="text-gray-700">Ermita, Manila 1000 Philippines</p>
              <p className="text-gray-700 mt-3">
                Email: <a href="mailto:info@swan-manila.com" className="text-[#207dff] hover:underline">info@swan-manila.com</a>
              </p>
              <p className="text-gray-700">
                Phone: <a href="tel:+6328526871819" className="text-[#207dff] hover:underline">+63-2-85268718 to 19</a>
              </p>
              <p className="text-gray-700">
                Emergency 24/7: <a href="tel:+6328523983" className="text-[#207dff] hover:underline">+63-2-85239830</a>
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12 text-center">
          <a
            href="/"
            style={{backgroundColor: '#003366'}}
            className="inline-block text-white px-8 py-3 font-semibold hover:shadow-lg transition-all duration-300 shadow-md"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;