import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HubsComponent } from './components/hubs/hubs.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminScholarsComponent } from './components/admin-scholars/admin-scholars.component';
import { MorePeopleComponent } from './components/more-people/more-people.component';
import { AdminApplicationsComponent } from './components/admin-applications/admin-applications.component';
import { AdminAwardedComponent } from './components/admin-awarded/admin-awarded.component';
import { UserProfileHomeComponent } from './components/user-profile-home/user-profile-home.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { AdminChaptersComponent } from './components/admin-chapters/admin-chapters.component';
import { AdminChapterHomeComponent } from './components/admin-chapter-home/admin-chapter-home.component';
import { AdminEventsHomeComponent } from './components/admin-events-home/admin-events-home.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { AdminRolesComponent } from './components/admin-roles/admin-roles.component';
import { AdminWftsTableComponent } from './components/admin-wfts-table/admin-wfts-table.component';
import { AdminElpsTableComponent } from './components/admin-elps-table/admin-elps-table.component';
import { SideBarMenuHomeComponent } from './components/side-bar-menu-home/side-bar-menu-home.component';
import { UserEventsComponent } from './components/user-events/user-events.component';
import { UserChapterHomeComponent } from './components/user-chapter-home/user-chapter-home.component';
import { UserActivitiesComponent } from './components/user-activities/user-activities.component';
import { PasswordResetFormComponent } from './components/password-reset-form/password-reset-form.component';
import { ForgotPasswordFormComponent } from './components/forgot-password-form/forgot-password-form.component';
import { AdminJobsComponent } from './components/admin-jobs/admin-jobs.component';
import { AdminJobProfileComponent } from './components/admin-job-profile/admin-job-profile.component';
import { AdminJobcardListComponent } from './components/admin-jobcard-list/admin-jobcard-list.component';
import { permissionGuardGuard } from './guards/permission-guard.guard';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminElimuTableComponent } from './components/admin-elimu-table/admin-elimu-table.component';
import { AdminTVETTableComponent } from './components/admin-tvet-table/admin-tvet-table.component';
import { AdminHubsComponent } from './components/admin-hubs/admin-hubs.component';
import { HubComponent } from './components/hub/hub.component';
// import { AdminEducationTableComponent } from './components/admin-education-table/admin-education-table.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AdminRegionalChaptersComponent } from './components/admin-regional-chapters/admin-regional-chapters.component';
import { AdminUserfeebackComponent } from './components/admin-userfeeback/admin-userfeeback.component';
import { AdminAddSpoltlightComponent } from './components/admin-add-spoltlight/admin-add-spoltlight.component';
import { AdminScholarsTableComponent } from './components/admin-scholars-table/admin-scholars-table.component';
import { OtpFormComponent } from './components/otp-form/otp-form.component';
import { OtpVerificationFormComponent } from './components/otp-verification-form/otp-verification-form.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { InstitutionsComponent } from './components/institutions/institutions.component';
import { AdminSurveyComponent } from './components/admin-survey/admin-survey.component';
import { AdminNewsUdateComponent } from './components/admin-news-udate/admin-news-udate.component';
import { AdminNewsletterComponent } from './components/admin-newsletter/admin-newsletter.component';
import { InternsHomeComponent } from './InternsModule/interns-home/interns-home.component';
import { DetailsFormComponent } from './InternsModule/details-form/details-form.component';
const routes: Routes = [
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  { path: 'login', component: UserLoginComponent },
  // { path: 'user/:id', component: AdminScholarsTableComponent },
  { path: 'adminlogin', component: AdminLoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [permissionGuardGuard],
    data: { permission: 'PROFILE_VIEW' },
  },
  // { path: 'hubs', component: HubsComponent },
  {
    path: 'sidebarhome',
    component: SideBarMenuHomeComponent,
    children: [
      {
        path: 'hubs',
        component: HubsComponent,
        canActivate: [permissionGuardGuard],
        data: { permission: 'PROFILE_VIEW' },
      },
      {
        path: 'hub',
        component: HubComponent,
        canActivate: [permissionGuardGuard],
        data: { permission: 'PROFILE_VIEW' },
      },
      {
        path: 'events',
        component: UserEventsComponent,
        canActivate: [permissionGuardGuard],
        data: { permission: 'EVENTS_VIEW' },
      },
      {
        path: 'activities',
        component: UserActivitiesComponent,
        canActivate: [permissionGuardGuard],
        data: { permission: 'ACTIVITY_VIEW' },
      },
      {
        path: 'chapterid',
        component: UserChapterHomeComponent,
        canActivate: [permissionGuardGuard],
        data: { permission: 'CHAPTER_VIEW' },
      },
      {
        path: 'jobs',
        component: AdminJobcardListComponent,

        canActivate: [permissionGuardGuard],
        data: { name: 'jobs', permission: 'PROFILE_VIEW' },
      },
      {
        path: 'jobs/jobprofile',
        component: AdminJobProfileComponent,
        canActivate: [permissionGuardGuard],
        data: { permission: 'PROFILE_VIEW' },
      },
      {
        path: 'people',
        component: MorePeopleComponent,
        // canActivate: [permissionGuardGuard],
        // data: { permission: 'PROFILE_VIEW' },
      },
    ],
  },
  {
    path: 'admin',
    component: AdminHomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      {
        path: 'dashboard',
        component: AdminDashboardComponent,
        canActivate: [permissionGuardGuard],
        data: { permission: 'APPLICATIONS_VIEW_ALL' },
      },
      {
        path: 'scholarstable',
        component: AdminScholarsTableComponent,
        canActivate: [permissionGuardGuard],
        data: { permission: 'ELPS_VIEW_ALL' },
      },
      {
        path: 'scholars',
        component: AdminScholarsComponent,
      },
      {
        path: 'applications',
        component: AdminApplicationsComponent,
        canActivate: [permissionGuardGuard],
        data: { permission: 'APPLICATIONS_VIEW_ALL' },
      },
      // {
      //   path: 'education',
      //   component: AdminEducationTableComponent,
      // },
      {
        path: 'awarded',
        component: AdminAwardedComponent,
        canActivate: [permissionGuardGuard],
        data: { permission: 'APPLICATIONS_VIEW_ALL' },
      },
      {
        path: 'chapters',
        component: AdminChaptersComponent,
        canActivate: [permissionGuardGuard],
        data: { permission: 'CHAPTER_VIEW_ALL' },
      },
      {
        path: 'regional-chapters',
        component: AdminRegionalChaptersComponent,
        canActivate: [permissionGuardGuard],
        data: { permission: 'CHAPTER_VIEW_ALL' },
      },

      { path: 'hubs', component: AdminHubsComponent },

      {
        path: 'chapterhome/:id',
        component: AdminChapterHomeComponent,
        canActivate: [permissionGuardGuard],
        data: { permission: 'CHAPTER_VIEW' },
      },
      {
        path: 'eventshome',
        component: AdminEventsHomeComponent,
        canActivate: [permissionGuardGuard],
        data: { permission: 'EVENTS_VIEW_ALL' },
      },
      {
        path: 'adminsview',
        component: AdminViewComponent,
        canActivate: [permissionGuardGuard],
        data: { permission: 'USER_VIEW_ALL' },
      },
      {
        path: 'roles',
        component: AdminRolesComponent,
        canActivate: [permissionGuardGuard],
        data: { permission: 'ROLES_VIEW_ALL' },
      },
      {
        path: 'wtfstable',
        component: AdminWftsTableComponent,
        canActivate: [permissionGuardGuard],
        data: { permission: 'APPLICATIONS_VIEW_ALL' },
      },
      {
        path: 'elpstable',
        component: AdminElpsTableComponent,
        canActivate: [permissionGuardGuard],
        data: { permission: 'ELPS_VIEW_ALL' },
      },

      {
        path: 'elimutable',
        component: AdminElimuTableComponent,
        canActivate: [permissionGuardGuard],
        data: { permission: 'ELPS_VIEW_ALL' },
      },
      {
        path: 'tvettable',
        component: AdminTVETTableComponent,
        canActivate: [permissionGuardGuard],
        data: { permission: 'ELPS_VIEW_ALL' },
      },
      {
        path: 'jobs',
        component: AdminJobsComponent,
        data: { name: 'jobs', permission: 'APPLICATIONS_VIEW_ALL' },
        canActivate: [permissionGuardGuard],
      },
      {
        path: 'userfeedback',
        component: AdminUserfeebackComponent,
        data: { name: 'jobs', permission: 'APPLICATIONS_VIEW_ALL' },
        canActivate: [permissionGuardGuard],
      },
      
    {
      path: 'NewsLetter',
      component: AdminNewsletterComponent,
      data: { name: 'jobs', permission: 'APPLICATIONS_VIEW_ALL' },
      canActivate: [permissionGuardGuard],
    },

      {
        path: 'survey',
        component: AdminSurveyComponent,
        data: { name: 'jobs', permission: 'APPLICATIONS_VIEW_ALL' },
        canActivate: [permissionGuardGuard],
      },
     
      {
        path: 'spotlight',
        component: AdminAddSpoltlightComponent,
        data: { name: 'jobs', permission: 'APPLICATIONS_VIEW_ALL' },
        canActivate: [permissionGuardGuard],
      },

      {
        path: 'newsUpdate',
        component: AdminNewsUdateComponent,
        data: { name: 'jobs', permission: 'APPLICATIONS_VIEW_ALL' },
        canActivate: [permissionGuardGuard],
      },
      {
        path: 'jobs/jobprofile',
        component: AdminJobProfileComponent,
        canActivate: [permissionGuardGuard],
        data: { permission: 'APPLICATIONS_VIEW_ALL' },
      }
    ],
  },

  {
    path: 'interns-2024',
    component: InternsHomeComponent
  },
  {
    path: 'intern-details',
    component: DetailsFormComponent
  },

  {
    path: 'people',
    component: MorePeopleComponent,
    // canActivate: [permissionGuardGuard],
    // data: { permission: 'PROFILE_VIEW' },
  },
  {
    path: 'user_profile',
    component: UserProfileHomeComponent,
    canActivate: [permissionGuardGuard],
    data: { permission: 'PROFILE_VIEW' },
  },
  {
    path: 'userprofile/:id',
    component: UserProfileHomeComponent,
    canActivate: [permissionGuardGuard],
    data: { permission: 'PROFILE_VIEW' },
  },
  {
    path: 'register',
    component: UserRegisterComponent,
  },
  { path: 'newpassword/:token', component: PasswordResetFormComponent },
  { path: 'login/resetpassword', component: ForgotPasswordFormComponent },
  { path: 'otpver', component:OtpVerificationFormComponent},
  {
    path: 'user/:id',
    component: UserDetailsComponent,
    canActivate: [permissionGuardGuard],
  },
  {
    path: 'institution/:id',
    component: InstitutionsComponent,
    canActivate: [permissionGuardGuard],
  },
  { path: 'otp', component: OtpFormComponent},
  { path: 'otpver', component:OtpVerificationFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
