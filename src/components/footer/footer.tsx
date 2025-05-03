import Link from "next/link"
import { Mail, MapPin, Phone, Github, Linkedin, Twitter } from "lucide-react"
import Image from "next/image"

export default function AbstractFooter() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 border-t border-blue-900/20">
      {/* Abstract background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-700/10 rounded-full blur-3xl"></div>

        {/* Abstract lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
        <div className="absolute bottom-1/4 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-400/10 to-transparent"></div>

        {/* Floating dots */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-blue-300 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-blue-500 rounded-full"></div>
        <div className="absolute bottom-1/2 left-1/2 w-2 h-2 bg-blue-400/50 rounded-full"></div>
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Company info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <Image  src={'/logo2.png'} alt="" width={70} height={70} />
              <h3 className="text-xl font-bold text-white">NanoTech EOR</h3>
            </div>
            <p className="text-blue-100/70 text-sm">
              Pioneering team in the future of Enhanced Oil Recovery with Nano.
            </p>
            <div className="flex space-x-4 pt-2">
           
              <a href="https://www.linkedin.com/in/zeyad-deeban-866291203/" className="text-blue-300 hover:text-blue-100 transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            

            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-blue-200 font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[{name:"Home",link:'#'}, {name:"About Us",link:"#about"}, {name:"Research",link:"https://drive.google.com/file/d/1Nr731rd4TceMUS_HlczgyFBU3MNkpA3Z/view?usp=sharing"}, {name:"Case Studies", link:"https://drive.google.com/drive/folders/1FoDWiqPs5Mx6bqDPWlUXCMU-u_vrqZ8t"}].map(({name,link}) => (
                <li key={name}>
                  <Link
                    href={link}
                    className="text-blue-100/70 hover:text-blue-300 transition-colors text-sm flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-blue-200 font-medium mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-blue-100/70 text-sm">Suez</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-blue-400 flex-shrink-0" />
                <span className="text-blue-100/70 text-sm">+20107751425</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-blue-400 flex-shrink-0" />
                <span className="text-blue-100/70 text-sm">zessam804@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider with abstract design */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-slate-950 px-4 flex space-x-2">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-2">
          <p className="text-blue-100/50 text-sm">
            © {new Date().getFullYear()} NanoTech EOR Solutions. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-blue-100/50 hover:text-blue-300 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-blue-100/50 hover:text-blue-300 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-blue-100/50 hover:text-blue-300 text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
