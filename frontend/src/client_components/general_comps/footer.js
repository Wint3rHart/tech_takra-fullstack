import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-transparent text-white py-12 mt-16">
      <div className="container mx-auto px-6 font-cormorant">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">

          {/* About Us */}
          <div>
            <h6 className="text-2xl font-bold  text-center font-orbitron text-[#A89E4F] mb-4">
              About Us
            </h6>
            <p className="text-gray-400 text-sm  text-center  leading-relaxed font-semibold max-w-md mx-auto md:mx-0">
              The Computer Science Society (CSS) at Government College University
              is committed to creating a collaborative, innovative, and inspiring
              environment for tech enthusiasts. We bring together students
              passionate about programming, research, development, and emerging
              technologies, helping them grow through events, workshops,
              competitions, and mentorship.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h6 className="text-2xl font-bold font-orbitron   text-center  text-[#A89E4F] mb-4">
              Quick Links
            </h6>
            <ul className="space-y-2 text-sm font-semibold  text-center ">
              {[
                { name: "Upcoming Events", link: "events?type=upcoming" },
                { name: "Past Events", link: "events?type=past" },
                { name: "Our Team", link: "/team" },
                { name: "Join Us", link: "/register" },
              ].map((label) => (
                <li key={label.name}>
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
          <div>
            <h6 className="text-2xl font-bold font-orbitron text-[#A89E4F] mb-4  text-center ">
              Contact Us
            </h6>

            <div className="space-y-3 text-sm font-semibold text-gray-400  text-center ">
              <p>
                <a
                  href="https://www.instagram.com/css.gcu?igsh=NTc4MTIwNjQ2YQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  Instagram
                </a>
              </p>

              <p>
                <a
                  href="http://dcs.gcu.edu.pk/DCS/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  Website
                </a>
              </p>

              <p>
                <a
                  href="https://www.linkedin.com/company/computer-science-society-gcu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  LinkedIn
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6">
        <div className="flex flex-col items-center space-y-4 font-cormorant">

          {/* Social Icons */}
          <div className="flex space-x-5">
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

          {/* Credits */}
          <p className="text-gray-500 text-sm">
            Developed By Hassan & Aly Iqbal For CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
