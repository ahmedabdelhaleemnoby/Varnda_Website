import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import AboutPage from "./Pages/AboutPage/AboutPage";
import ContactPage from "./Pages/ContactPage/ContactPage";
import TermsPage from "./Pages/TermsPage/TermsPage";
import SearchPage from "./Pages/SearchPage/SearchPage";
import MoreDeteliesPage from "./Pages/MoreDeteliesPage/MoreDeteliesPage";
import FavPage from "./Pages/FavPage/FavPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import SignupPage from "./Pages/SignupPage/SignupPage";
import SubmitpropertyPage from "./Pages/SubmitpropertyPage/SubmitpropertyPage";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import AddApartmentsAndDuplexesPage from "./Pages/AddApartmentsAndDuplexesPage/AddApartmentsAndDuplexesPage";
import AddVillasAndPalacesPage from "./Pages/AddVillasAndPalacesPage/AddVillasAndPalacesPage";
import AddHomePropertyPage from "./Pages/AddHomePropertyPage/AddHomePropertyPage";
import AddResortsAndCoastsPage from "./Pages/AddResortsAndCoastsPage/AddResortsAndCoastsPage";
import AddCommercialUnitsPage from "./Pages/AddCommercialUnitsPage/AddCommercialUnitsPage";
import AddLandPage from "./Pages/AddLandPage/AddLandPage";
import AddBuildingsPage from "./Pages/AddBuildingsPage/AddBuildingsPage";
import AddNewCemeteries from "./Pages/AddNewCemeteries/AddNewCemeteries";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import MyPropertiesPage from "./Pages/MyPropertiesPage/MyPropertiesPage";
import ArticleDetailes from "./Pages/Articles/ArticleDetailes/ArticleDetailes";
import Articles from "./Pages/Articles/Articles";
import ArticlesInCategory from "./Pages/Articles/ArticlesInCategory";
import AdminLayout from "./Pages/AdminLayout";
import AddArticle from "./Pages/Dashboard/Articles/AddArticle";
import CategoryArticle from "./Pages/Dashboard/CategoryArticle";
import Governments from "./Pages/Dashboard/Places/Governments";
import Cities from "./Pages/Dashboard/Places/Cities";
import Regions from "./Pages/Dashboard/Places/Regions";
import Streets from "./Pages/Dashboard/Places/Streets";
import Compounds from "./Pages/Dashboard/Places/Compounds";
import AllArticles from "./Pages/Dashboard/Articles/AllArticles";
import ArticlesCategory from "./Pages/Dashboard/Articles/ArticlesCategory";
import Molls from "./Pages/Dashboard/Places/Molls";
import AllAds from "./Pages/Dashboard/AllAds";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import AuthGoogle from "./Pages/AuthGoogle/AuthGoogle";
import AddQuickPage from "./Pages/AddQuickPage/AddQuickPage";
import LoginWithRole from "./Components/LoginWithRole/LoginWithRole";
import AddUsers from "./Pages/Dashboard/Users/AddUsers";
import ShowAllUsers from "./Pages/Dashboard/Users/ShowAllUsers";
import EditArticle from "./Pages/Dashboard/Articles/EditArticle";
import AllDrafts from "./Pages/Dashboard/Articles/AllDrafts";
import ArticlesWithTag from "./Pages/Articles/ArticlesWithTag";
import EditQuickPage from "./Pages/EditAdsPages/EditQuickPage/EditQuickPage";
import EditApartmentsAndDuplexesPage from "./Pages/EditAdsPages/EditApartmentsAndDuplexesPage/EditApartmentsAndDuplexesPage";
import EditVillasAndPalacesPage from "./Pages/EditAdsPages/EditVillasAndPalacesPage/EditVillasAndPalacesPage";
import EditHomePropertyPage from "./Pages/EditAdsPages/EditHomePropertyPage/EditHomePropertyPage";
import EditResortsAndCoastsPage from "./Pages/EditAdsPages/EditResortsAndCoastsPage/EditResortsAndCoastsPage";
import EditCommercialUnitsPage from "./Pages/EditAdsPages/EditCommercialUnitsPage/EditCommercialUnitsPage";
import EditLandPage from "./Pages/EditAdsPages/EditLandPage/EditLandPage";
import EditBuildingsPage from "./Pages/EditAdsPages/EditBuildingsPage/EditBuildingsPage";
import EditNewCemeteries from "./Pages/EditAdsPages/EditNewCemeteries/EditNewCemeteries";
import GovPage from "./Pages/LocationsPage/GovPage/GovPage";
import AddGovFilter from "./Pages/Dashboard/Filters/Government/AddGovFilter";
import AddProjectFilter from "./Pages/Dashboard/Filters/Project/AddProjectFilter";
import AllFilters from "./Pages/Dashboard/Filters/AllFilters";
import AllGovFilters from "./Pages/Dashboard/Filters/Government/AllGovFilters";
import AllProjectFilters from "./Pages/Dashboard/Filters/Project/AllProjectFilters";
import EditFilter from "./Components/Filters/EiteFilter";
import CityPage from "./Pages/LocationsPage/CityPage/CityPage";
import CompoundPage from "./Pages/LocationsPage/CompoundPage/CompoundPage";
import FilterPage from "./Pages/FilterPage/FilterPage";
import AllCityFilters from "./Pages/Dashboard/Filters/City/AllCityFilters";
import AddCityFilter from "./Pages/Dashboard/Filters/City/AddCityFilter";
import AllRegionFilters from "./Pages/Dashboard/Filters/Region/AllRegionFilters";
import AddRegionFilter from "./Pages/Dashboard/Filters/Region/AddRegionFilter";
import SendEmail from "./Pages/ForgetPasswordPage/SendEmail";
import ResetPassword from "./Pages/ForgetPasswordPage/ResetPassword";
import DeleteImages from "./Components/DeleteItem/DeleteImages";
import EditGovernments from "./Pages/Dashboard/EditPlaces/EditGovernments";
import EditCities from "./Pages/Dashboard/EditPlaces/EditCities";
import EditCompounds from "./Pages/Dashboard/EditPlaces/EditCompounds";
import ShowAdsComments from "./Pages/Dashboard/Comments/ShowAdsComments";
import ShowPostsComments from "./Pages/Dashboard/Comments/ShowPostsComments";
import GovsHome from "./Pages/GovsHome/GovsHome";
import ProjectsHome from "./Pages/ProjectsHome/ProjectsHome";
import PrivacyPolicyPage from "./Pages/PrivacyPolicyPage/PrivacyPolicyPage";
import GeneralPages from "./Pages/Dashboard/GeneralPages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />

        <Route path="/admin-login" element={<LoginWithRole role="admin" />} />
        <Route path="/seo-login" element={<LoginWithRole role="seo" />} />
        <Route path="/writer-login" element={<LoginWithRole role="writer" />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/google-auth" element={<AuthGoogle />} />

        <Route path="/send-email" element={<SendEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/governorates" element={<GovsHome />} />
        <Route path="/projects" element={<ProjectsHome />} />
        <Route path="/projects/:compound" element={<CompoundPage />} />

        {/* <Route path="/Blogs" element={<Articles />} />
        <Route path="/Blog/:id" element={<ArticleDetailes />} />
        <Route path="/Blogs/:category" element={<ArticlesInCategory />} />
        <Route path="/Blogs/tags/:tag" element={<ArticlesWithTag />} /> */}

        <Route path="/blog" element={<Articles />} />
        <Route path="/blog/:id" element={<ArticleDetailes />} />
        <Route path="/blog/type/:category" element={<ArticlesInCategory />} />
        <Route path="/blog/tags/:tag" element={<ArticlesWithTag />} />

        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

        <Route path="/search" element={<SearchPage />} />
        <Route path="/search/:gov" element={<SearchPage />} />
        <Route path="/filter/:filter" element={<FilterPage />} />
        <Route path="/property/:id" element={<MoreDeteliesPage />} />

        <Route path="/submit-property" element={<SubmitpropertyPage />} />

        <Route
          path="/myprofile"
          element={
            <ProtectedRoute allowedRoles={["user", "admin", "writer", "seo"]}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "writer", "seo"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<h1>Dashboard</h1>} />

          <Route
            path="all-ads"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AllAds />
              </ProtectedRoute>
            }
          />
          <Route
            path="general-pages"
            element={
              <ProtectedRoute allowedRoles={["admin", "seo"]}>
                <GeneralPages />
              </ProtectedRoute>
            }
          />

          <Route path="category" element={<CategoryArticle />} />

          <Route path="Blogs" element={<AllArticles />} />
          <Route path="Drafts" element={<AllDrafts />} />
          <Route path="Blogs-category" element={<ArticlesCategory />} />
          <Route path="add-Blog" element={<AddArticle />} />
          <Route path="edit-Blog" element={<EditArticle />} />

          <Route
            path="delete-unused-images"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <DeleteImages />
              </ProtectedRoute>
            }
          />

          <Route
            path="governments"
            element={
              <ProtectedRoute allowedRoles={["admin", "seo"]}>
                <Governments />
              </ProtectedRoute>
            }
          />
          <Route
            path="edit-governments"
            element={
              <ProtectedRoute allowedRoles={["admin", "seo"]}>
                <EditGovernments />
              </ProtectedRoute>
            }
          />

          <Route
            path="cities"
            element={
              <ProtectedRoute allowedRoles={["admin", "seo"]}>
                <Cities />
              </ProtectedRoute>
            }
          />
          <Route
            path="edit-cities"
            element={
              <ProtectedRoute allowedRoles={["admin", "seo"]}>
                <EditCities />
              </ProtectedRoute>
            }
          />

          <Route
            path="regions"
            element={
              <ProtectedRoute allowedRoles={["admin", "seo"]}>
                <Regions />
              </ProtectedRoute>
            }
          />
          <Route
            path="streets"
            element={
              <ProtectedRoute allowedRoles={["admin", "seo"]}>
                <Streets />
              </ProtectedRoute>
            }
          />

          <Route
            path="compounds"
            element={
              <ProtectedRoute allowedRoles={["admin", "seo"]}>
                <Compounds />
              </ProtectedRoute>
            }
          />
          <Route
            path="edit-compounds"
            element={
              <ProtectedRoute allowedRoles={["admin", "seo"]}>
                <EditCompounds />
              </ProtectedRoute>
            }
          />

          <Route
            path="molls"
            element={
              <ProtectedRoute allowedRoles={["admin", "seo"]}>
                <Molls />
              </ProtectedRoute>
            }
          />

          <Route
            path="add-users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AddUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ShowAllUsers role="admin" />
              </ProtectedRoute>
            }
          />
          <Route
            path="writer"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ShowAllUsers role="writer" />
              </ProtectedRoute>
            }
          />
          <Route
            path="seo"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ShowAllUsers role="seo" />
              </ProtectedRoute>
            }
          />

          <Route
            path="filters"
            element={
              <ProtectedRoute allowedRoles={["admin", "seo"]}>
                <AllFilters />
              </ProtectedRoute>
            }
          />

          <Route
            path="filters/governorates"
            element={
              <ProtectedRoute allowedRoles={["admin", "seo"]}>
                <AllGovFilters />
              </ProtectedRoute>
            }
          />
          <Route
            path="filters/add-gov-filter"
            element={
              <ProtectedRoute allowedRoles={["admin", "seo"]}>
                <AddGovFilter />
              </ProtectedRoute>
            }
          />

          <Route
            path="filters/cities"
            element={
              <ProtectedRoute allowedRoles={["admin", "seo"]}>
                <AllCityFilters />
              </ProtectedRoute>
            }
          />
          <Route
            path="filters/add-city-filter"
            element={
              <ProtectedRoute allowedRoles={["admin", "seo"]}>
                <AddCityFilter />
              </ProtectedRoute>
            }
          />

          <Route
            path="filters/regions"
            element={
              <ProtectedRoute allowedRoles={["admin", "seo"]}>
                <AllRegionFilters />
              </ProtectedRoute>
            }
          />
          <Route
            path="filters/add-region-filter"
            element={
              <ProtectedRoute allowedRoles={["admin", "seo"]}>
                <AddRegionFilter />
              </ProtectedRoute>
            }
          />

          <Route
            path="filters/projects"
            element={
              <ProtectedRoute allowedRoles={["admin", "seo"]}>
                <AllProjectFilters />
              </ProtectedRoute>
            }
          />
          <Route
            path="filters/add-project-filter"
            element={
              <ProtectedRoute allowedRoles={["admin", "seo"]}>
                <AddProjectFilter />
              </ProtectedRoute>
            }
          />

          <Route
            path="filters/edit-filter"
            element={
              <ProtectedRoute allowedRoles={["admin", "seo"]}>
                <EditFilter />
              </ProtectedRoute>
            }
          />
          {/* coments */}
          <Route
            path="ads-comments"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ShowAdsComments />
              </ProtectedRoute>
            }
          />
          <Route
            path="posts-comments"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ShowPostsComments />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* User Routes */}
        <Route
          path="/favorite-properties"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <FavPage />
            </ProtectedRoute>
          }
        />
        {/* Add ads route */}
        <Route
          path="/add-quick-property"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <AddQuickPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-apartments-duplexes"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <AddApartmentsAndDuplexesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-villas-palaces"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <AddVillasAndPalacesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-home-property"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <AddHomePropertyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-resorts-coasts"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <AddResortsAndCoastsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-commercial-units"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <AddCommercialUnitsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-lands"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <AddLandPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-buildings"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <AddBuildingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-cemeteries"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <AddNewCemeteries />
            </ProtectedRoute>
          }
        />

        {/* Edite ads route */}
        <Route
          path="/edit-quick-property"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <EditQuickPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-apartments-duplexes"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <EditApartmentsAndDuplexesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-villas-palaces"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <EditVillasAndPalacesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-home-property"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <EditHomePropertyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-resorts-coasts"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <EditResortsAndCoastsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-commercial-units"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <EditCommercialUnitsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-lands"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <EditLandPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-buildings"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <EditBuildingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-cemeteries"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <EditNewCemeteries />
            </ProtectedRoute>
          }
        />

        <Route
          path="/myproperties"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <MyPropertiesPage />
            </ProtectedRoute>
          }
        />

        {/* Locations Pages */}
        <Route path="/:gov" element={<GovPage />} />
        <Route path="/:gov/:city" element={<CityPage />} />
        <Route path="/:gov/:city/:compound" element={<CompoundPage />} />
        {/*  */}

        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

