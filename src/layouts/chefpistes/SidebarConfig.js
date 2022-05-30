import { Icon } from "@iconify/react";
import peopleFill from "@iconify/icons-eva/people-fill";
import fileTextFill from "@iconify/icons-eva/file-text-fill";
import dashbordIcon from "../../components/dashbordIcon.svg";
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: "dashboard",
    path: "/chefpistes/app",
    icon: <img src={dashbordIcon} alt="" srcSet="" />,
  },
  {
    title: "Gestion des produits",
    path: "/chefpistes/gestionproduit",
    icon: getIcon(fileTextFill),
  },
  
   {
    title: "Inventaires",
    path: "/chefpistes/Tableau-cp",
    icon: getIcon(fileTextFill),
  },
   {
    title: "Fiches Lubrifiants",
    path: "/chefpistes/Fiche-Lub",
    icon: getIcon(fileTextFill),
  },
   {
    title: "Fiches Accessoires",
    path: "/chefpistes/Fiche-Acc",
    icon: getIcon(fileTextFill),
  },
  /*  {
    title: "Fiches Lub/Acc",
    path: "/chefpistes/FicheLubAcc",
    icon: getIcon(fileTextFill),
  }, */
];

export default sidebarConfig;
