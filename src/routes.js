// import { useRoutes } from 'react-router-dom';
// import Login from './pages/login';
// import SignUp from './pages/signup';
// import Showpost from './pages/showPpost'
// export default function Router(props) {
//   const routes = useRoutes([
//     // {
//     //   path: '/',
//     //   element: <Login/>,
//     // },
//     {
//       path: 'login',
//       element: <Login/>
//     },
//     {
//         path: 'signup',
//         element: <SignUp/>
//       },
//       {
//         path: '/showpost',
//         element: <Showpost/>
//       }
//   ]);

//   return routes;
// }

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import SignUp from './pages/signup';
import Showpost from './pages/showPpost'; // Corrected the import statement for 'Showpost'
import NewPost from './pages/newpost';
import Location from './pages/location';
import ScheduledPostForm from './pages/ScheduledPostForm';
import Newfood from './pages/Newfood';
import DonationForm from './pages/donationform';
import AnnouncementList from './pages/annou';
export default function Router(props) {
  return (
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Showpost />} />
        <Route path="/newpost" element={<NewPost />} />
        <Route path="/newfood" element={<Newfood />} />
        <Route path="/location" element={<Location />} />
        <Route path="/scheduler" element={<ScheduledPostForm />} />
        <Route path="/donationform" element={<DonationForm />} />
        <Route path="/announcement" element={<AnnouncementList />} />

      </Routes>
  );
}
