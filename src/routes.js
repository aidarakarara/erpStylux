import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import AdminLayout from "./layouts/admin";
import PompisteLayouts from "./layouts/pompiste";
import ChefPisteLayouts from "./layouts/chefpistes";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
//Rapport Activité Layouts
//import RapportLayouts from "./layouts/pathRappActiQuot";
//
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardApp from "./pages/DashboardApp";
import NotFound from "./pages/Page404";
import SeverError from "./pages/Page500";
import IlotList from "./pages/ilots/IlotList";
import ClientsList from "./pages/clients/ClientsList";
import ClientDetails from "./pages/clients/ClientDetails";

import IlotsPompesList from "./pages/ilots/IlotsPompesList";
import PompestList from "./pages/pompes/PompesList";
import PistoletsList from "./pages/pistolets/PistoletsList";
import Cuves from "./pages/cuves/Cuves";

import Caisses from "./pages/pompistes/Caisses";
import Caisse2 from "./pages/pompistes/Caisse2";
import Caisse from "./pages/pompistes/Caisse";
//Rapports Activite   //Recemment Ajoutees Pour L'Ajout
import FicheChefPiste from "./pages/ficheChefPistes/FicheChefPiste";
//
import FicheLubrifiant from "./pages/ficheLubrifiants/FicheLubrifiant";
import FicheLavage from "./pages/ficheLavages/FicheLavage";
import ListeLub from "./pages/ficheLubrifiants/ListeLub";
import ListeLubcp from "./pages/ficheLubrifiants/ListeLubcp";
import ListeAcc from "./pages/ficheAccessoires/ListeAcc";
import ListeAcccp from "./pages/ficheAccessoires/ListeAcccp";
import FicheAccessoire from "./pages/ficheAccessoires/FicheAccessoire";
import FicheEtat from "./pages/Etatdesstocks/FicheEtat";
import Tableau from "./pages/Etatdesstocks/Tableau";
import TabChefpiste from "./pages/Etatdesstocks/TabChefpiste";
import ListeLav from "./pages/ficheLavages/ListeLav";
import Service from "./pages/services/ListeService";
import Categories from "./pages/ficheChefPistes/gestionProduit/produits/modales/modaleAddCategorie.jsx";

import Gerant from "./pages/gerant/";
//Tableau de bord Chef de Piste
import IndexDashboard from "./pages/ficheChefPistes/IndexDashboard";
import Synthese from "./pages/ficheChefPistes/Synthese";
//Tableau de bord pomp./pages/ficheChefPistes/Syntheses
import IndexDashboardPompiste from "./pages/pompistes/IndexDashboard";
//Les Milldewares pour protection des routes selon les roles
import Protected from "./Protected";
import ProtectedAdmin from "./ProtectedAdmin";
import PrivatePompiste from "./PrivatePompiste";
import PrivateChefPiste from "./PrivateChefPiste";
import UsersList from "./pages/admin/users/UsersList";

import PompisteDetail from "./pages/gerant/GestionPompistes/index";
import PompistesList from "./pages/gerant/GestionPompistes/pompistesList";

//Pompiste
import Journees from "./pages/ficheChefPistes/Journees";
import Lecalendrier from "./pages/Calendrier/Lecalendrier";
import Activites from "./pages/gerant/activites";
import PasswordUpdate from "./pages/PasswordUpdate";
import Index from "./pages/ficheChefPistes/Syntheses/Index";
import GestionProduit from "./pages/ficheChefPistes/gestionProduit/GestionProduit";
import Inventaire from "./pages/ficheChefPistes/gestionProduit/inventaire/index";
import ListeInventaire from "./pages/ficheChefPistes/gestionProduit/inventaire/ListeInventaire";
import Rapport from "./pages/gerant/rapport/rapport";
import TabDepense from "./pages/gerant/TabDepenses";
import FicheLubAcc from "src/pages/ficheChefPistes/FicheLubAcc";

// ----------------------------------------------------------------------
export default function Router() {
  return useRoutes([
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { path: "/", element: <Navigate to="/admin/app" replace /> },
        { path: "app", element: <ProtectedAdmin component={DashboardApp} /> },
        { path: "ilots", element: <ProtectedAdmin component={IlotList} /> },
        {
          path: "ilots/:id/pompes",
          element: <ProtectedAdmin component={IlotsPompesList} />,
        },
        {
          path: "updatePassword",
          element: <ProtectedAdmin component={PasswordUpdate} />,
        },
        { path: "pompes", element: <ProtectedAdmin component={PompestList} /> },
        {
          path: "pistolets",
          element: <ProtectedAdmin component={PistoletsList} />,
        },
        { path: "cuves", element: <ProtectedAdmin component={Cuves} /> },
        {
          path: "fichePompistes",
          element: <ProtectedAdmin component={Caisse} />,
        },
        {
          path: "ficheChefPistes",
          element: <ProtectedAdmin component={Journees} />,
        },
        //Rapport ACtivites rappActiQuots
        /*   {
          path: "clients",
          element: <ProtectedAdmin component={IndeComp} />,
        }, */
        //autres routes rappActiQuots
        /*  { path: "IndeComp", element: <IndeComp /> },
        { path: "AutrRece", element: <AutrRece /> },
        { path: "JaugManuRele", element: <JaugManuRele /> },
        { path: "TenuCaisIntePoinEau", element: <TenuCaisIntePoinEau /> },
        { path: "RegiGestInde", element: <RegiGestInde /> },
        { path: "CaisPomp15H", element: <CaisPomp15H /> },
        { path: "GestStocCarb", element: <GestStocCarb /> },
        { path: "LubrPompPomp", element: <LubrPompPomp /> },
        { path: "CumuReceCarbMois", element: <CumuReceCarbMois /> },
        { path: "CumuVentTpeMois", element: <CumuVentTpeMois /> },
        { path: "VentGimMois", element: <VentGimMois /> },
        { path: "CumuRechCartTpeMois", element: <CumuRechCartTpeMois /> },
        { path: "TenuCaisRegiShel", element: <TenuCaisRegiShel /> },
        { path: "Recharts", element: <Recharts /> }, */

        //--------Fin petits Tableau
        {
          path: "usersList",
          element: <ProtectedAdmin component={UsersList} />,
        },
        //    { path: "ficheChefPistes", element: <FicheChefPiste /> },
        { path: "ficheLubrifiants", element: <FicheLubrifiant /> },
        { path: "ficheAccessoires", element: <FicheAccessoire /> },
        // { path: "rappActiQuots", element: <IndeComp /> },
      ],
    },
    {
      path: "/gerants",
      element: <DashboardLayout />,
      children: [
        { path: "/", element: <Navigate to="/gerants/app" replace /> },
        { path: "app", element: <Protected component={Gerant} /> },
        {
          path: "activites/:date",
          element: <Protected component={Activites} />,
        },
        {
          path: "rapports",
          element: <Protected component={Rapport} />,
        },
        {
          path: "TabDepenses",
          element: <Protected component={TabDepense} />,
        },
        { path: "Tableau", element: <Protected component={Tableau} /> },
        {
          path: "Tableau/:date/ficheEtat",
          element: <Protected component={FicheEtat} />,
        },
        {
          path: "pompistes",
          element: <Protected component={PompistesList} />,
        },
        {
          path: "pompistes/:id",
          element: <Protected component={PompisteDetail} />,
        },

        {
          path: "updatePassword",
          element: <Protected component={PasswordUpdate} />,
        },
        { path: "employers", element: <Protected component={UsersList} /> },
        { path: "ListeLub", element: <Protected component={ListeLub} /> },
        { path: "ListeLubcp", element: <Protected component={ListeLubcp} /> },
        { path: "ListeAcc", element: <Protected component={ListeAcc} /> },
        { path: "ListeAcccp", element: <Protected component={ListeAcccp} /> },
        { path: "ListeLav", element: <Protected component={ListeLav} /> },
        { path: "FicheLavage", element: <Protected component={FicheLavage} /> },
        { path: "Service", element: <Protected component={Service} /> },
        {
          path: "ficheLavage/:date",
          element: <Protected component={FicheLavage} />,
        },
        {
          path: "ficheLubrifiant/:date",
          element: <Protected component={FicheLubrifiant} />,
        },
        {
          path: "ficheAccessoire/:date",
          element: <Protected component={FicheAccessoire} />,
        },

        { path: "calendrier", element: <Protected component={Lecalendrier} /> },
        {
          path: "caisses/:caisse",
          element: <Protected component={Caisse} />,
        },

        ///CaisseTest
        {
          path: "synthese/:date",
          element: <Protected component={Index} />,
        },

        { path: "clients", element: <Protected component={ClientsList} /> },
        {
          path: "clients/:id",
          element: <Protected component={ClientDetails} />,
        },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        //SeverError
        { path: "404", element: <NotFound /> },
        { path: "500", element: <SeverError /> },

        { path: "/", element: <Navigate to="/admin/app" replace /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "/pompistes",
      element: <PompisteLayouts />,
      children: [
        { path: "/", element: <Navigate to="/pompistes/app" replace /> },
        //   { path: "app", element: <PrivatePompiste component={Pompistes} /> },
        {
          path: "app",
          element: <PrivatePompiste component={IndexDashboardPompiste} />,
        },
        { path: "caisses", element: <PrivatePompiste component={Caisses} /> },
        {
          path: "caisses/:caisse/2",
          element: <PrivatePompiste component={Caisse2} />,
        },
        {
          path: "caisses/:caisse",
          element: <PrivatePompiste component={Caisse} />,
        },
        {
          path: "updatePassword",
          element: <PrivatePompiste component={PasswordUpdate} />,
        },

        { path: "*", element: <NotFound /> },
        { path: "ListeLub", element: <PrivatePompiste component={ListeLub} /> },
        { path: "ListeAcc", element: <PrivatePompiste component={ListeAcc} /> },
        {
          path: "ListeLub/:date/ficheLubrifiants",
          element: <PrivatePompiste component={FicheLubrifiant} />,
        },
        {
          path: ":date/ficheLubrifiants",
          element: <Protected component={FicheLubrifiant} />,
        },
        /*   {
          path: ":date/ficheAccessoires",
          element: <PrivateChefPiste component={FicheAccessoire} />,
        }, */
        {
          path: "ListeAcc/:date/ficheAccessoires",
          element: <PrivatePompiste component={FicheAccessoire} />,
        },
      ],
    },
    {
      path: "/chefpistes",
      element: <ChefPisteLayouts />,
      children: [
        { path: "/", element: <Navigate to="/chefpistes/app" replace /> },
        {
          path: "app",
          element: <PrivateChefPiste component={IndexDashboard} />,
        }, //IndexDashboard ChefPistes
        /*  {
          path: "ficheChefPistes",
          element: <PrivateChefPiste component={Journees} />,
        }, */
        {
          path: "updatePassword",
          element: <PrivateChefPiste component={PasswordUpdate} />,
        },
        {
          path: "journee/:date",
          element: <PrivateChefPiste component={Synthese} />,
        },
        {
          path: "ficheChefPistes/:caisse",
          element: <PrivateChefPiste component={Caisse} />,
        },
        //  { path: "chefpistes/ficheChefPistes/:ficheChefPiste/1", element: <PrivateChefPiste component={FicheChefPiste} /> },
        {
          path: "ficheChefPistes/synthese/:date",
          element: <PrivateChefPiste component={Index} />,
        },
        {
          path: "ficheChefPistes/ficheLavage/:date",
          element: <PrivateChefPiste component={FicheLavage} />,
        },
        {
          path: "ficheChefPistes/listeLub/ficheLubrifiant/:date",
          element: <PrivateChefPiste component={FicheLubrifiant} />,
        },

        {
          path: "Categories",
          element: <PrivateChefPiste component={Categories} />,
        },
        {
          path: "GestionProduit",
          element: <PrivateChefPiste component={GestionProduit} />,
        },
        {
          path: "Inventaire",
          element: <PrivateChefPiste component={Inventaire} />,
        },
        {
          path: "Inventaire/ListeInventaire",
          element: <PrivateChefPiste component={ListeInventaire} />,
        },
        {
          path: "FicheLubAcc",
          element: <PrivateChefPiste component={FicheLubAcc} />,
        },
        { path: "ListeLub", element: <PrivateChefPiste component={ListeLub} /> },
        { path: "Fiche-Lub", element: <PrivateChefPiste component={ListeLubcp} /> },
        { path: "ListeAcc", element: <PrivateChefPiste component={ListeAcc} /> },
        { path: "Fiche-Acc", element: <PrivateChefPiste component={ListeAcccp} /> },
       
        { path: "FicheEtat", element: <PrivateChefPiste component={FicheEtat} /> },
        {
          path: "Fiche-Lub/:date/ficheLubrifiants",
          element: <PrivateChefPiste component={FicheLubrifiant} />,
        },
        {
          path: "ListeLub/:date/ficheLubrifiants",
          element: <PrivateChefPiste component={FicheLubrifiant} />,
        },
        { path: "Tableau", element: <PrivateChefPiste component={Tableau} /> },
        { path: "Tableau-cp", element: <PrivateChefPiste component={TabChefpiste} /> },
        {
          path: "Tableau/:date/ficheEtat",
          element: <PrivateChefPiste component={FicheEtat} />,
        },
        {
          path: "Tableau-cp/:date/ficheEtat",
          element: <PrivateChefPiste component={FicheEtat} />,
        },
        
        {
          path: "ListeAcc/:date/ficheAccessoires",
          element: <PrivateChefPiste component={FicheAccessoire} />,
        },
        {
          path: "Fiche-Acc/:date/ficheAccessoires",
          element: <PrivateChefPiste component={FicheAccessoire} />,
        },
        /* {
          path: "FicheLubAcc/ListeLub/:date/ficheLubrifiants",
          element: <Protected component={FicheLubrifiant} />,
        },
        {
          path: "FicheLubAcc/ListeAcc/:date/ficheAccessoires",
          element: <Protected component={FicheAccessoire} />,
        }, */

        /*   {
          path: "ficheChefPistes/synthese/:date/2",
          element: <PrivateChefPiste component={Index} />,
        }, */
        {
          path: "FicheLavage",
          element: <PrivateChefPiste component={FicheLavage} />,
        },
        {
          path: "/pommpistes/ListeLub/ficheLubrifiants/:date",
          element: <Protected component={FicheLubrifiant} />,
        },
        {
          path: "/pommpistes/ListeLub/ficheLAccessoires/:date",
          element: <Protected component={FicheAccessoire} />,
        },

        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
  ]);
}
