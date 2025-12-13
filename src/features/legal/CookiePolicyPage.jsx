const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-4xl mx-auto px-8">
        <div className="mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Cookie Policy
          </h1>
          <p className="text-gray-600">
            Last updated: December 9, 2025
          </p>
        </div>

        <div className="bg-white rounded-3xl p-12 shadow-lg space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. What Are Cookies?
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Cookies are small text files that are placed on your computer or mobile device when you
              visit our website. They are widely used to make websites work more efficiently and provide
              information to website owners. Cookies help us understand how you use our website and
              improve your browsing experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. How We Use Cookies
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              SWAN Shipping Corporation uses cookies for the following purposes:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li><strong>Essential Cookies:</strong> Required for the website to function properly, including security and accessibility features</li>
              <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our website by collecting anonymous information</li>
              <li><strong>Functionality Cookies:</strong> Remember your preferences and settings to provide enhanced features</li>
              <li><strong>Analytics Cookies:</strong> Allow us to analyze website traffic and improve user experience</li>
              <li><strong>Marketing Cookies:</strong> Track your online activity to deliver relevant advertisements (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Types of Cookies We Use
            </h2>

            <div className="space-y-6">
              <div className="bg-blue-50 border-l-4 border-[#207dff] p-6 rounded-r-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Essential Cookies (Always Active)
                </h3>
                <p className="text-gray-700 text-sm mb-3">
                  These cookies are necessary for the website to function and cannot be switched off.
                </p>
                <ul className="list-disc ml-6 space-y-1 text-sm text-gray-700">
                  <li>Session management cookies</li>
                  <li>Security cookies to prevent fraud</li>
                  <li>Load balancing cookies</li>
                  <li>Cookie consent preference cookies</li>
                </ul>
              </div>

              <div className="bg-cyan-50 border-l-4 border-cyan-500 p-6 rounded-r-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Performance & Analytics Cookies
                </h3>
                <p className="text-gray-700 text-sm mb-3">
                  Help us understand how visitors use our website.
                </p>
                <ul className="list-disc ml-6 space-y-1 text-sm text-gray-700">
                  <li>Google Analytics for traffic analysis</li>
                  <li>Page visit counters</li>
                  <li>User behavior tracking (anonymized)</li>
                  <li>Error tracking and debugging</li>
                </ul>
              </div>

              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Functionality Cookies
                </h3>
                <p className="text-gray-700 text-sm mb-3">
                  Remember your preferences and provide enhanced features.
                </p>
                <ul className="list-disc ml-6 space-y-1 text-sm text-gray-700">
                  <li>Language preference cookies</li>
                  <li>Form auto-fill data</li>
                  <li>Video player settings</li>
                  <li>Chat widget preferences</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Third-Party Cookies
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Some cookies are placed by third-party services that appear on our pages. We use the
              following third-party services:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li><strong>Google Analytics:</strong> Website traffic analysis and user behavior insights</li>
              <li><strong>Social Media Platforms:</strong> LinkedIn, Twitter, Facebook for social sharing features</li>
              <li><strong>Payment Processors:</strong> Secure payment processing for service bookings</li>
              <li><strong>Email Service Providers:</strong> Newsletter management and email communications</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              These third parties may use cookies to collect information about your online activities
              over time and across different websites. Please refer to their privacy policies for
              more information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. How to Control Cookies
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the right to decide whether to accept or reject cookies. You can exercise your
              cookie preferences in the following ways:
            </p>

            <div className="bg-gray-50 p-6 rounded-xl space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Browser Settings</h3>
                <p className="text-sm text-gray-700">
                  Most web browsers allow you to control cookies through their settings preferences.
                  However, limiting cookies may impact your experience on our website.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Cookie Preference Center</h3>
                <p className="text-sm text-gray-700 mb-3">
                  You can manage your cookie preferences through our Cookie Preference Center:
                </p>
                <button className="bg-gradient-to-r from-[#207dff] to-[#00bfff] text-white px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300">
                  Manage Cookie Preferences
                </button>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Opt-Out Links</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" className="text-[#207dff] hover:underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out</a></li>
                  <li>• Network Advertising Initiative: <a href="https://optout.networkadvertising.org" className="text-[#207dff] hover:underline" target="_blank" rel="noopener noreferrer">NAI Opt-out</a></li>
                  <li>• Digital Advertising Alliance: <a href="https://optout.aboutads.info" className="text-[#207dff] hover:underline" target="_blank" rel="noopener noreferrer">DAA Opt-out</a></li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Browser-Specific Instructions
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To manage cookies in your browser, please follow these links:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li><a href="https://support.google.com/chrome/answer/95647" className="text-[#207dff] hover:underline" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" className="text-[#207dff] hover:underline" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" className="text-[#207dff] hover:underline" target="_blank" rel="noopener noreferrer">Safari (macOS)</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-[#207dff] hover:underline" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Mobile Devices
            </h2>
            <p className="text-gray-700 leading-relaxed">
              For mobile devices, you can control cookies and tracking through your device settings.
              You can also reset your advertising identifier or opt out of personalized advertising
              through your device's privacy settings (iOS: Settings → Privacy → Advertising, Android:
              Settings → Google → Ads).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Updates to This Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in technology,
              legislation, or our business practices. We will notify you of any material changes by
              posting the new Cookie Policy on this page and updating the "Last updated" date at the
              top of this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have questions about our use of cookies, please contact us:
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
            </div>
          </section>
        </div>

        <div className="mt-12 text-center">
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-[#207dff] to-[#00bfff] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;