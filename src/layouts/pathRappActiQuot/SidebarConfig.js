import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import peopleFill from "@iconify/icons-eva/people-fill";
import shoppingBagFill from "@iconify/icons-eva/shopping-bag-fill";
import fileTextFill from "@iconify/icons-eva/file-text-fill";
import lockFill from "@iconify/icons-eva/lock-fill";
import personAddFill from "@iconify/icons-eva/person-add-fill";
import alertTriangleFill from "@iconify/icons-eva/alert-triangle-fill";
import pompeIncon from "../../components/pompe.svg";
import cuveIcon from "../../components/cuveIcon.svg";
import pistoletIcon from "../../components/pistoletIcon.svg";
import dashbordIcon from "../../components/dashbordIcon.svg";
//Activités
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [ 
  //ca n'existe pluuus
  ///Rapports Activités 
 {
    title: 'Index Compteurs',
    path: '/rappActiQuots/IndeComp',
    icon: getIcon(fileTextFill)
  },      
  {
    title: 'Autres Recettes',
    path: '/rappActiQuots/AutrRece',
    icon: getIcon(fileTextFill)         
  },      
  {
    title: 'Jauge Manuelle Releves',       
    path: '/rappActiQuots/JaugManuRele',
    icon: getIcon(fileTextFill)        
  } ,         
  {
    title: 'Tenue Caisse Interne Point Eau',       
    path: '/rappActiQuots/TenuCaisIntePoinEau',
    icon: getIcon(fileTextFill)        
  } ,
  {
    title: 'Registre Gestion Index',       
    path: '/rappActiQuots/RegiGestInde',
    icon: getIcon(fileTextFill)        
  }     ,
   {
    title: 'Caisse Pompiste 15H',       
    path: '/rappActiQuots/CaisPomp15H',
    icon: getIcon(fileTextFill)        
  }  ,
  {
    title: 'Gestion Des Stocks De Carburants',       
    path: '/rappActiQuots/GestStocCarb',
    icon: getIcon(fileTextFill)        
  }  ,
  {
    title: 'Gestion Lubrifiants Pompe2-Pompiste',       
    path: '/rappActiQuots/LubPompPomp',
    icon: getIcon(fileTextFill)        
  }  ,
  {
    title: 'Gestion Cumul Receptions Carburants du Mois',       
    path: '/rappActiQuots/CumuReceCarbMois',   
    icon: getIcon(fileTextFill)        
  }  ,
  {
    title: 'Gestion Lubrifiants Pompe2-Pompiste',       
    path: '/rappActiQuots/CumuVentTpeMois',
    icon: getIcon(fileTextFill)        
  } 
 

];

export default sidebarConfig;          
