import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
       <footer className="bg-transparent flex flex-col items-center justify-center text-white py-6 mt-12">
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
          {[{name:"Future Events",link:"events?type=past"},{name:"Past Events",link:"events?type=upcoming"},  {name:"Our Team",link:"/team"}, {name:"Join Us",link:"/register"}].map((label) => (
            <li key={label}>
              <Link
                href={`/${label.link}`}
                className="text-gray-400 hover:text-white transition"
              >
                {label.name}
              </Link>
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
            href="https://www.instagram.com/css.gcu?igsh=NTc4MTIwNjQ2YQ=="
            target="_blank"
            rel="noopener noreferrer"
          >
          Instagram
          </a>
        </p>
 <p className="text-gray-400 text-sm font-semibold">
          <i className="fa fa-envelope me-2" style={{ color: "#2D567C" }}></i>
          <a
            href="http://dcs.gcu.edu.pk/DCS/"
            target="_blank"
            rel="noopener noreferrer"
          >
      Website
          </a>
        </p>

       <p className="text-gray-400 text-sm font-semibold">
          <i className="fa fa-envelope me-2" style={{ color: "#2D567C" }}></i>
          <a
            href="https://www.linkedin.com/company/computer-science-society-gcu/"
            target="_blank"
            rel="noopener noreferrer"
          >
      LinkedIn
          </a>
        </p>
     

       
      </div>

      {/* Legal */}
     
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
    <p className="text-gray-500 text-sm font-normal">Developed By Hassan & Aly Iqbal For CSS</p>
  </div>
</footer>

    );
}

export default Footer;
