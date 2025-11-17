import React from 'react';

const Footer = () => {
    return (
       <footer className="bg-transparent text-white py-6 mt-12">
  <div className="container mx-auto px-4 font-cormorant">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      
      {/* About Us */}
      <div className="md:ps-[25px] lg:ps-0">
        <h6 className="text-2xl font-bold font-orbitron text-[#A89E4F] mb-4">About Us</h6>
        <p className="text-gray-400 text-sm leading-relaxed font-semibold">
          Engine Finders is the UK's top price comparison website for Used &amp; Reconditioned Car Engines. We
          can help you save up to 60% on engine replacement cost by instantly connecting you with hundreds
          of verified suppliers nationwide.
        </p>
      </div>

      {/* Quick Links */}
      <div className="md:ps-[25px] lg:flex lg:flex-col lg:items-center">
        <h6 className="text-2xl font-bold font-orbitron text-[#A89E4F] mb-4 lg:ms-[-80px]">Quick Links</h6>
        <ul className="space-y-2 text-sm font-semibold">
          {["Blog", "Reviews", "Sitemap", "Frequently Asked Questions", "Newsletter"].map((label) => (
            <li key={label}>
              <a
                href={`./${label.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-gray-400 hover:text-white transition"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Us */}
      <div className="md:ps-[30px] md:mx-auto mx-0 mb-4 space-y-3">
        <h6 className="text-2xl font-bold font-orbitron text-[#A89E4F] mb-4">Contact Us</h6>

        <p className="text-gray-400 text-sm font-semibold">
          <i className="fa fa-envelope me-2" style={{ color: "#2D567C" }}></i>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=Info@enginefinders.co.uk"
            target="_blank"
            rel="noopener noreferrer"
          >
            Info@enginefinders.co.uk
          </a>
        </p>

        <p className="text-gray-400 text-sm font-semibold">
          <i className="fa-solid fa-phone me-2" style={{ color: "#2D567C" }}></i>
          <a href="tel:+442034884649">020 3488 4649</a>
        </p>

        <p className="text-gray-400 text-sm font-semibold">
          <i className="fa-brands fa-whatsapp me-2 text-[18px]" style={{ color: "#2D567C" }}></i>
          <a href="https://wa.me/447311343662" target="_blank" rel="noopener noreferrer">
            07311 343662
          </a>
        </p>

        <p className="text-gray-400 text-sm font-semibold">
          <i className="fa-regular fa-comments text-[#2D567C] me-2 text-[15px]"></i>
          <a href="./contact-us">Contact us</a>
        </p>

        <p className="text-gray-400 text-sm font-semibold">
          <i className="fa-solid fa-headset text-[#2D567C] me-2 text-[18px]"></i>
          <a href="./live-chat">Live Chat</a>
        </p>
      </div>

      {/* Legal */}
      <div className="md:ps-[25px] xl:ps-0 lg:ps-0 lg:flex lg:flex-col lg:items-center">
        <h6 className="text-2xl font-bold font-orbitron text-[#A89E4F] mb-4 lg:ms-[-80px]">Legal</h6>
        <ul className="space-y-2 text-sm font-semibold">
          {[
            { href: "./about-us", label: "About Us" },
            { href: "./privacy-policy", label: "Privacy Policy" },
            { href: "./terms-and-condition", label: "Terms & Conditions" },
            { href: "./cookies-policy", label: "Cookies Policy" },
            { href: "./legal-disclaimer", label: "Legal Disclaimers" },
          ].map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-gray-400 hover:text-white transition">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>

  {/* Footer Bottom */}
  <div className="space-y-2 text-center border-t border-gray-700 mt-6 pt-4 container mx-auto flex flex-col items-center font-cormorant">
    <div className="flex space-x-4">
      {[
        { href: "https://www.facebook.com/EngineFinders", icon: "fab fa-facebook-f" },
        { href: "https://www.instagram.com/enginefinders/", icon: "fab fa-instagram" },
        { href: "https://x.com/enginefinders", icon: "fa-brands fa-x-twitter" },
        { href: "https://www.linkedin.com/company/engine-finders/", icon: "fab fa-linkedin-in" },
        { href: "https://www.youtube.com/@EngineFinders", icon: "fa-brands fa-youtube" },
        { href: "https://www.tiktok.com/@enginefinders", icon: "fa-brands fa-tiktok" },
      ].map((social) => (
        <a
          key={social.href}
          href={social.href}
          className="text-gray-400 hover:text-white text-xl transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className={social.icon}></i>
        </a>
      ))}
    </div>
    <p className="text-gray-500 text-sm font-normal">© 2025 Engine Finders. All rights reserved.</p>
  </div>
</footer>

    );
}

export default Footer;
