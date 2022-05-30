import { Icon } from "@iconify/react";
import peopleFill from "@iconify/icons-eva/people-fill";
import pompeIncon from "../../components/pompe.svg";
import cuveIcon from "../../components/cuveIcon.svg";
import pistoletIcon from "../../components/pistoletIcon.svg";
import dashbordIcon from "../../components/dashbordIcon.svg";
//Activités
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: "dashboard",
    path: "/admin/app",
    icon: <img src={dashbordIcon} alt="" srcSet="" />,
  },
  {
    title: "Utulisateurs",
    path: "/admin/usersList",
    icon: getIcon(peopleFill),
  },
  {
    title: "cuves",
    path: "/admin/cuves",
    icon: <img src={cuveIcon} alt="" srcSet="" />,
  },
  {
    title: "ilots",
    path: "/admin/ilots",
    icon: getIcon(peopleFill),
  },
 
  {
    title: "pompes",
    path: "/admin/pompes",
    icon: <img src={pompeIncon} alt="" srcSet="" />,
  },
  
  {
    title: "pistolets",
    path: "/admin/pistolets",
    icon: <img src={pistoletIcon} alt="" srcSet="" />,
  },
  
 /* {
    title: 'Fiche Pompiste',
    path: '/admin/fichePompistes',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'Fiche Chef de Piste',
    path: '/admin/ficheChefPistes',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'Fiche Lubrifiant',
    path: '/admin/ficheLubrifiants',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'Fiche Accessoire',
    path: '/admin/ficheAccessoires',
    icon: getIcon(fileTextFill)
  },
  ///Rapports Activités 
  {
    title: 'Rapport Activité Quotidient ',       
    path: '/admin/rappActiQuots',
    icon: getIcon(fileTextFill)        
  },
  //Rapports Activités
      {
        title: 'IndeComp',
        path: '/admin/IndeComp',
        icon: getIcon(fileTextFill)
      },      
      {
        title: 'AutrRece',
        path: '/admin/AutrRece',
        icon: getIcon(fileTextFill)         
      },      
      {
        title: 'JaugManuRele',       
        path: '/admin/JaugManuRele',
        icon: getIcon(fileTextFill)        
      } ,         
      {
        title: 'TenuCaisIntePoinEau',       
        path: '/admin/TenuCaisIntePoinEau',
        icon: getIcon(fileTextFill)        
      } ,
      {
        title: 'RegiGestInde',       
        path: '/admin/RegiGestInde',
        icon: getIcon(fileTextFill)        
      }     ,
      {
        title: 'CaisPomp15H',       
        path: '/admin/CaisPomp15H',
        icon: getIcon(fileTextFill)        
      }  ,
      {
        title: 'GestStocCarb',       
        path: '/admin/GestStocCarb',
        icon: getIcon(fileTextFill)        
      }  ,
      {
        title: 'LubrPompPomp',       
        path: '/admin/LubrPompPomp',
        icon: getIcon(fileTextFill)        
      }  ,
      {
        title: 'CumuReceCarbMois',       
        path: '/admin/CumuReceCarbMois',   
        icon: getIcon(fileTextFill)        
      }  ,
      {
        title: 'CumuVentTpeMois',       
        path: '/admin/CumuVentTpeMois',
        icon: getIcon(fileTextFill)        
      }   ,
      {
        title: 'VentGimMois',       
        path: '/admin/VentGimMois',
        icon: getIcon(fileTextFill)        
      }   ,
      {
        title: 'CumuRechCartTpeMois',       
        path: '/admin/CumuRechCartTpeMois',
        icon: getIcon(fileTextFill)        
      } ,
      {
        title: 'TenuCaisRegiShel',       
        path: '/admin/TenuCaisRegiShel',
        icon: getIcon(fileTextFill)        
      } */

];

export default sidebarConfig;          
