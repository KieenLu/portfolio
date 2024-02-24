import {
  FaFacebookSquare,
  FaGithub,
  FaLinkedin,
  FaPhone,
} from "react-icons/fa";
import { SiGmail } from "react-icons/si";

export const LIST_CONTACT_ME = [
  {
    name: "0982818401",
    href: "",
    icon: <FaPhone size={25} />,
    key: "phone",
  },
  {
    name: "Kieenlu",
    href: "https://github.com/KieenLu",
    icon: <FaGithub size={25} />,
    key: "github",
  },
  {
    name: "kienlu2000@gmail.com",
    href: "kienlu2000@gmail.com",
    icon: <SiGmail size={25} />,
    key: "gmail",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/lu.kien.37/",
    icon: <FaFacebookSquare size={25} />,
    key: "facebook",
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/ki%C3%AAn-l%C6%B0-184282178/",
    icon: <FaLinkedin size={25} />,
    key: "linkedin",
  },
];
