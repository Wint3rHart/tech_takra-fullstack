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
          The Computer Science Society (CSS) at Government College University is committed to creating a collaborative, innovative, and inspiring environment for tech enthusiasts. We bring together students passionate about programming, research, development, and emerging technologies, helping them grow through events, workshops, competitions, and mentorship.
        </p>
      </div>

      {/* Quick Links */}
      <div className="md:ps-[25px] lg:flex lg:flex-col lg:items-center">
        <h6 className="text-2xl font-bold font-orbitron text-[#A89E4F] mb-4 lg:ms-[-80px]">Quick Links</h6>
        <ul className="space-y-2 text-sm font-semibold">
          {["Events", "Projects", "Team", "Join CSS", "Gallery"].map((label) => (
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
            href="mailto:gcu.css.official@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            gcu.css.official@gmail.com
          </a>
        </p>

        <p className="text-gray-400 text-sm font-semibold">
          <i className="fa-solid fa-phone me-2" style={{ color: "#2D567C" }}></i>
          <a href="tel:+923000000000">+92 300 0000000</a>
        </p>

        <p className="text-gray-400 text-sm font-semibold">
          <i className="fa-brands fa-whatsapp me-2 text-[18px]" style={{ color: "#2D567C" }}></i>
          <a target="_blank" rel="noopener noreferrer">
            +92 300 0000000
          </a>
        </p>

        <p className="text-gray-400 text-sm font-semibold">
          <i className="fa-regular fa-comments text-[#2D567C] me-2 text-[15px]"></i>
          <a href="./contact-us">Reach Out</a>
        </p>

        <p className="text-gray-400 text-sm font-semibold">
          <i className="fa-solid fa-headset text-[#2D567C] me-2 text-[18px]"></i>
          <a href="./support">Student Support</a>
        </p>
      </div>

      {/* Legal */}
      <div className="md:ps-[25px] xl:ps-0 lg:ps-0 lg:flex lg:flex-col lg:items-center">
        <h6 className="text-2xl font-bold font-orbitron text-[#A89E4F] mb-4 lg:ms-[-80px]">Legal</h6>
        <ul className="space-y-2 text-sm font-semibold">
          {[
            { href: "./about", label: "About CSS" },
            { href: "./privacy-policy", label: "Privacy Policy" },
            { href: "./terms", label: "Terms & Conditions" },
            { href: "./code-of-conduct", label: "Code of Conduct" },
            { href: "./policies", label: "General Policies" },
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
        { href: "https://www.instagram.com/gcu.css", icon: "fab fa-instagram" },
        { href: "https://www.facebook.com", icon: "fab fa-facebook-f" },
        { href: "https://www.linkedin.com", icon: "fab fa-linkedin-in" },
        { href: "https://x.com", icon: "fa-brands fa-x-twitter" },
        { href: "https://www.youtube.com", icon: "fa-brands fa-youtube" },
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
    <p className="text-gray-500 text-sm font-normal">Made With Love By Hassan Nadeem & M.ALi Iqbal</p>
  </div>
</footer>

    );
}

export default Footer;
