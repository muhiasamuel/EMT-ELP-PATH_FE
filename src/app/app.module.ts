import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';


// import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { NgApexchartsModule } from 'ng-apexcharts';

import { NgChartsModule } from 'ng2-charts';

// angular material imports
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatListModule, MatNavList } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSliderModule } from '@angular/material/slider';

// admin
import { AdminScholarGraphComponent } from './components/admin-scholar-graph/admin-scholar-graph.component';
import { AdminApplicationsGraphComponent } from './components/admin-applications-graph/admin-applications-graph.component';
import { AdminElpsGraphComponent } from './components/admin-elps-graph/admin-elps-graph.component';
import { AdminWtfsGraphComponent } from './components/admin-wtfs-graph/admin-wtfs-graph.component';
import { AdminScholarTableComponent } from './components/admin-scholar-table/admin-scholar-table.component';
import { DonorGraphComponent } from './components/donor-graph/donor-graph.component';
import { AdminApplicationTableComponent } from './components/admin-application-table/admin-application-table.component';
import { AdminElpsTableComponent } from './components/admin-elps-table/admin-elps-table.component';
import { AdminWftsTableComponent } from './components/admin-wfts-table/admin-wfts-table.component';
import { AdminJourneyComponent } from './components/admin-journey/admin-journey.component';
import { AdminApplicationInfoComponent } from './components/admin-application-info/admin-application-info.component';
import { AdminEducationComponent } from './components/admin-education/admin-education.component';
import { AdminExpensesComponent } from './components/admin-expenses/admin-expenses.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminScholarsComponent } from './components/admin-scholars/admin-scholars.component';
import { AdminApplicationsComponent } from './components/admin-applications/admin-applications.component';
import { AdminAwardedComponent } from './components/admin-awarded/admin-awarded.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminSideBarMenuComponent } from './components/admin-side-bar-menu/admin-side-bar-menu.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { ScholarsCardComponent } from './components/scholars-card/scholars-card.component';
import { ApplicationsCardComponent } from './components/applications-card/applications-card.component';
import { ElpsCardComponent } from './components/elps-card/elps-card.component';
import { ExpenditureCardComponent } from './components/expenditure-card/expenditure-card.component';
import { WtfsCardComponent } from './components/wtfs-card/wtfs-card.component';

// user
import { UserProfileHomeComponent } from './components/user-profile-home/user-profile-home.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { BioFormComponent } from './components/bio-form/bio-form.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { CareerFormComponent } from './components/career-form/career-form.component';
import { EducationFormComponent } from './components/education-form/education-form.component';
import { SocialMediaFormComponent } from './components/social-media-form/social-media-form.component';
import { ImageFormComponent } from './components/image-form/image-form.component';
import { ProfilePicComponent } from './components/profile-pic/profile-pic.component';
import { CareerComponent } from './components/career/career.component';
import { BioComponent } from './components/bio/bio.component';
import { EducationComponent } from './components/education/education.component';
import { HomeComponent } from './components/home/home.component';
import { HubsComponent } from './components/hubs/hubs.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SideBarMenuComponent } from './components/side-bar-menu/side-bar-menu.component';
import { FeedsComponent } from './components/feeds/feeds.component';
import { PostComponent } from './components/post/post.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { MorePeopleComponent } from './components/more-people/more-people.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminApplicationFormComponent } from './components/admin-application-form/admin-application-form.component';
import { AdminEducationFormComponent } from './components/admin-education-form/admin-education-form.component';
import { AdminExpenseFormComponent } from './components/admin-expense-form/admin-expense-form.component';
import { AdminAddSchoolFormComponent } from './components/admin-add-school-form/admin-add-school-form.component';
import { AdminAwardingStatusGraphComponent } from './components/admin-awarding-status-graph/admin-awarding-status-graph.component';
import { AdminAddChaptersFormComponent } from './components/admin-add-chapters-form/admin-add-chapters-form.component';
import { AdminChaptersComponent } from './components/admin-chapters/admin-chapters.component';
import { AdminRecentActivitiesCardComponent } from './components/admin-recent-activities-card/admin-recent-activities-card.component';
import { AdminScheduledActivitiesCardComponent } from './components/admin-scheduled-activities-card/admin-scheduled-activities-card.component';
import { AdminOngoingActivitiesCardComponent } from './components/admin-ongoing-activities-card/admin-ongoing-activities-card.component';
import { AdminChapterProfileComponent } from './components/admin-chapter-profile/admin-chapter-profile.component';
import { AdminChapterActivitiesComponent } from './components/admin-chapter-activities/admin-chapter-activities.component';
import { AdminChapterEventsComponent } from './components/admin-chapter-events/admin-chapter-events.component';
import { AdminChapterHomeComponent } from './components/admin-chapter-home/admin-chapter-home.component';
import { AdminChapterEventsCardComponent } from './components/admin-chapter-events-card/admin-chapter-events-card.component';
import { AdminChapterActivitiesCardComponent } from './components/admin-chapter-activities-card/admin-chapter-activities-card.component';
import { AdminEventsHomeComponent } from './components/admin-events-home/admin-events-home.component';
import { AdminAddActivityFormComponent } from './components/admin-add-activity-form/admin-add-activity-form.component';
import { AdminAddEventFormComponent } from './components/admin-add-event-form/admin-add-event-form.component';
import { AdminRolesComponent } from './components/admin-roles/admin-roles.component';
import { AdminAddRolesFormComponent } from './components/admin-add-roles-form/admin-add-roles-form.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { AddAdminFormComponent } from './components/add-admin-form/add-admin-form.component';
import { AdminBranchChampionCardComponent } from './components/admin-branch-champion-card/admin-branch-champion-card.component';
import { AdminSuperadminCardComponent } from './components/admin-superadmin-card/admin-superadmin-card.component';
import { AdminChapterleaderCardComponent } from './components/admin-chapterleader-card/admin-chapterleader-card.component';
import { AdminTableComponent } from './components/admin-table/admin-table.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AdminAddJobUpdateComponent } from './components/admin-add-job-update/admin-add-job-update.component';
import { AdminNewsUdateComponent } from './components/admin-news-udate/admin-news-udate.component';
import { AdminNewsUdateFormComponent } from './components/admin-news-udate-form/admin-news-udate-form.component';
import { AdminNewsUdateDeleteDialogComponent } from './components/admin-news-udate-delete-dialog/admin-news-udate-delete-dialog.component';
import { AdminNewsUdatePutformComponent } from './components/admin-news-udate-putform/admin-news-udate-putform.component';
import { AdminNewsletterComponent } from './components/admin-newsletter/admin-newsletter.component';
import { AdminNewsletterFormComponent } from './components/admin-newsletter-form/admin-newsletter-form.component';
import { AdminNewsletterDeleteformComponent } from './components/admin-newsletter-deleteform/admin-newsletter-deleteform.component';
import { AdminNewsletterFormUpdateComponent } from './components/admin-newsletter-form-update/admin-newsletter-form-update.component';

// service
import { HttpServiceService } from './services/http-service.service';
import { AdminApplicationsPermissionComponent } from './components/admin-applications-permission/admin-applications-permission.component';
import { AdminEventsPermissionComponent } from './components/admin-events-permission/admin-events-permission.component';
import { AdminActivityPermissionComponent } from './components/admin-activity-permission/admin-activity-permission.component';
import { AdminChaptersPermissionComponent } from './components/admin-chapters-permission/admin-chapters-permission.component';
import { AdminRolesPermissionComponent } from './components/admin-roles-permission/admin-roles-permission.component';
import { AdminAdminsPermissionComponent } from './components/admin-admins-permission/admin-admins-permission.component';
import { HttpinterceptorInterceptor } from './httpinterceptor.interceptor';
import { AdminApplicationAwardformComponent } from './components/admin-application-awardform/admin-application-awardform.component';
import { AdminApplicationRejecformComponent } from './components/admin-application-rejecform/admin-application-rejecform.component';
import { AdminAddElpFormComponent } from './components/admin-add-elp-form/admin-add-elp-form.component';
import { AdminMakeElpFormComponent } from './components/admin-make-elp-form/admin-make-elp-form.component';
import { UserProfileCardComponent } from './components/user-profile-card/user-profile-card.component';
import { UserProfileDialogComponent } from './components/user-profile-dialog/user-profile-dialog.component';
import { MorePeopleCardComponent } from './components/more-people-card/more-people-card.component';
import { SideBarMenuHomeComponent } from './components/side-bar-menu-home/side-bar-menu-home.component';
import { UserEventsComponent } from './components/user-events/user-events.component';
import { UserActivitiesComponent } from './components/user-activities/user-activities.component';
import { UserChapterHomeComponent } from './components/user-chapter-home/user-chapter-home.component';
import { PasswordResetFormComponent } from './components/password-reset-form/password-reset-form.component';
import { ForgotPasswordFormComponent } from './components/forgot-password-form/forgot-password-form.component';
import { UserProfilePermissionComponent } from './components/user-profile-permission/user-profile-permission.component';
import { UserFeedsPermissionComponent } from './components/user-feeds-permission/user-feeds-permission.component';
import { AdminDeleteroleFormComponent } from './components/admin-deleterole-form/admin-deleterole-form.component';
import { AdminDeleteFormComponent } from './components/admin-delete-form/admin-delete-form.component';
import { AdminAddbranchFormComponent } from './components/admin-addbranch-form/admin-addbranch-form.component';
import { AdminJobsComponent } from './components/admin-jobs/admin-jobs.component';
import { AdminJobcardListComponent } from './components/admin-jobcard-list/admin-jobcard-list.component';
import { AdminJobProfileComponent } from './components/admin-job-profile/admin-job-profile.component';
import { AdminAddjobFormComponent } from './components/admin-addjob-form/admin-addjob-form.component';
import { PermissionsServiceService } from './services/permissions-service.service';
import { AdminAddOrganizationFormComponent } from './components/admin-add-organization-form/admin-add-organization-form.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminElimuTableComponent } from './components/admin-elimu-table/admin-elimu-table.component';
import { AdminTVETTableComponent } from './components/admin-tvet-table/admin-tvet-table.component';
import { AdminHubsComponent } from './components/admin-hubs/admin-hubs.component';
import { AdminHubHomeComponent } from './components/admin-hub-home/admin-hub-home.component';
import { AdminHubEventsComponent } from './components/admin-hub-events/admin-hub-events.component';
import { AdminHubEventsCardComponent } from './components/admin-hub-events-card/admin-hub-events-card.component';
import { AdminHubProfileComponent } from './components/admin-hub-profile/admin-hub-profile.component';
import { AdminHubActivitiesComponent } from './components/admin-hub-activities/admin-hub-activities.component';
import { AdminHubActivitiesCardComponent } from './components/admin-hub-activities-card/admin-hub-activities-card.component';
import { AdminHubleaderCardComponent } from './components/admin-hubleader-card/admin-hubleader-card.component';
import { AdminAddHubsFormComponent } from './components/admin-add-hubs-form/admin-add-hubs-form.component';
import { HubComponent } from './components/hub/hub.component';
import { AdminTvetCountCardComponent } from './components/admin-tvet-count-card/admin-tvet-count-card.component';
import { AdminElimuCountCardComponent } from './components/admin-elimu-count-card/admin-elimu-count-card.component';

import { AdminAddScholarComponent } from './components/admin-add-scholar/admin-add-scholar.component';

import { SearchNavComponent } from './components/search-nav/search-nav.component';
import { DashboardDataService } from './dashboard-data.service';
import { SkillsComponent } from './components/skills/skills.component';
import { AdminRegionalChaptersComponent } from './components/admin-regional-chapters/admin-regional-chapters.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminAddScholarFormComponent } from './components/admin-add-scholar-form/admin-add-scholar-form.component';
import { SkillsFormComponent } from './components/skills-form/skills-form.component';
import { UserFeedbackComponent } from './components/user-feedback/user-feedback.component';
import { AdminUserfeebackComponent } from './components/admin-userfeeback/admin-userfeeback.component';
import { ServiceService } from './services/service.service';
import { SearchComponent } from './components/search/search.component';
import { AdminAddSpoltlightComponent } from './components/admin-add-spoltlight/admin-add-spoltlight.component';
import { AdminScholarsTableComponent } from './components/admin-scholars-table/admin-scholars-table.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { OtpFormComponent } from './components/otp-form/otp-form.component';
import { AdminAddSpotlightUpdateComponent } from './components/admin-add-spotlight-update/admin-add-spotlight-update.component';
import { AdminAddSpotlightDeleteComponent } from './components/admin-add-spotlight-delete/admin-add-spotlight-delete.component';
import { AdminSurveyComponent } from './components/admin-survey/admin-survey.component';

import { AdminTotalGlobalscholarsCardComponent } from './components/admin-total-globalscholars-card/admin-total-globalscholars-card.component';
import { AdminScholargenderGraphComponent } from './components/admin-scholargender-graph/admin-scholargender-graph.component';
import { SpotlightSourceComponent } from './components/spotlight-source/spotlight-source.component';
import { AdminSportlightFormComponent } from './components/admin-sportlight-form/admin-sportlight-form.component';
import { OtpVerificationFormComponent } from './components/otp-verification-form/otp-verification-form.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { InstitutionsComponent } from './components/institutions/institutions.component';
import { SearchService } from './services/search.service';
import { CheckboxService } from './services/checkbox.service';
import { PeoplePostComponent } from './components/people-post/people-post.component';
import { DashCardComponent } from './components/layout/dash-card/dash-card.component';
import { MinorDonorsGraphComponent } from './components/minor-donors-graph/minor-donors-graph.component';
import { InternsHomeComponent } from './InternsModule/interns-home/interns-home.component';
import { InternsService } from './InternsModule/interns.service';
import { DetailsFormComponent } from './InternsModule/details-form/details-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgSelectModule } from '@ng-select/ng-select';
import { ExamplePdfViewerComponent } from './example-pdf-viewer/example-pdf-viewer.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { AdminAddRoleComponent } from './components/admin-add-role/admin-add-role.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminUsersWidgetsComponent } from './components/admin-users-widgets/admin-users-widgets.component';
@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HubsComponent,
        HubComponent,
        NavbarComponent,
        SideBarMenuComponent,
        FeedsComponent,
        PostComponent,
        AdminHomeComponent,
        AdminSideBarMenuComponent,
        AdminNavbarComponent,
        ScholarsCardComponent,
        ApplicationsCardComponent,
        ElpsCardComponent,
        ExpenditureCardComponent,
        WtfsCardComponent,
        PostFormComponent,
        MorePeopleComponent,
        AdminDashboardComponent,
        AdminScholarsComponent,
        AdminApplicationsComponent,
        AdminAwardedComponent,
        UserProfileComponent,
        AdminScholarGraphComponent,
        AdminApplicationsGraphComponent,
        AdminElpsGraphComponent,
        AdminWtfsGraphComponent,
        AdminScholarTableComponent,
        AdminApplicationTableComponent,
        AdminElpsTableComponent,
        AdminWftsTableComponent,
        UserProfileHomeComponent,
        AdminJourneyComponent,
        AdminApplicationInfoComponent,
        AdminEducationComponent,
        AdminExpensesComponent,
        UserLoginComponent,
        UserRegisterComponent,
        BioFormComponent,
        ProfileFormComponent,
        CareerFormComponent,
        EducationFormComponent,
        SocialMediaFormComponent,
        ImageFormComponent,
        ProfilePicComponent,
        CareerComponent,
        HomeComponent,
        BioComponent,
        EducationComponent,
        AdminApplicationFormComponent,
        AdminEducationFormComponent,
        AdminExpenseFormComponent,
        AdminAddSchoolFormComponent,
        AdminAwardingStatusGraphComponent,
        AdminAddChaptersFormComponent,
        AdminChaptersComponent,
        AdminRecentActivitiesCardComponent,
        AdminScheduledActivitiesCardComponent,
        AdminOngoingActivitiesCardComponent,
        AdminChapterProfileComponent,
        AdminChapterActivitiesComponent,
        AdminChapterEventsComponent,
        AdminChapterHomeComponent,
        AdminChapterEventsCardComponent,
        AdminChapterActivitiesCardComponent,
        AdminEventsHomeComponent,
        AdminAddActivityFormComponent,
        AdminAddEventFormComponent,
        AdminRolesComponent,
        AdminAddRolesFormComponent,
        AdminViewComponent,
        AddAdminFormComponent,
        AdminBranchChampionCardComponent,
        AdminSuperadminCardComponent,
        AdminChapterleaderCardComponent,
        AdminTableComponent,
        AdminApplicationsPermissionComponent,
        AdminEventsPermissionComponent,
        AdminActivityPermissionComponent,
        AdminChaptersPermissionComponent,
        AdminRolesPermissionComponent,
        AdminAdminsPermissionComponent,
        AdminApplicationAwardformComponent,
        AdminApplicationRejecformComponent,
        AdminAddElpFormComponent,
        AdminMakeElpFormComponent,
        UserProfileCardComponent,
        UserProfileDialogComponent,
        MorePeopleCardComponent,
        SideBarMenuHomeComponent,
        UserEventsComponent,
        UserActivitiesComponent,
        UserChapterHomeComponent,
        PasswordResetFormComponent,
        ForgotPasswordFormComponent,
        UserProfilePermissionComponent,
        UserFeedsPermissionComponent,
        AdminDeleteroleFormComponent,
        AdminDeleteFormComponent,
        AdminAddbranchFormComponent,
        AdminJobsComponent,
        AdminJobcardListComponent,
        AdminJobProfileComponent,
        AdminAddjobFormComponent,
        AdminAddOrganizationFormComponent,
        AdminLoginComponent,
        AdminElimuTableComponent,
        AdminTVETTableComponent,
        AdminHubsComponent,
        AdminHubHomeComponent,
        AdminHubEventsComponent,
        AdminHubEventsCardComponent,
        AdminHubProfileComponent,
        AdminHubActivitiesComponent,
        AdminHubActivitiesCardComponent,
        AdminHubleaderCardComponent,
        AdminAddHubsFormComponent,
        HubComponent,
        AdminTvetCountCardComponent,
        AdminElimuCountCardComponent,
        AdminAddScholarComponent,
        LandingPageComponent,
        SearchNavComponent,
        AdminRegionalChaptersComponent,
        FooterComponent,
        AdminAddScholarFormComponent,
        SkillsFormComponent,
        UserFeedbackComponent,
        AdminUserfeebackComponent,
        SearchComponent,
        AdminAddSpoltlightComponent,
        AdminScholarsTableComponent,
        TermsAndConditionsComponent,
        OtpFormComponent,
        AdminTotalGlobalscholarsCardComponent,
        AdminScholargenderGraphComponent,
        SpotlightSourceComponent,
        AdminSportlightFormComponent,
        OtpVerificationFormComponent,
        PeoplePostComponent,
        UserDetailsComponent,
        InstitutionsComponent,
        AdminSurveyComponent,
        DashCardComponent,
        AdminNewsUdateComponent,
        AdminNewsUdateDeleteDialogComponent,
        AdminNewsUdateFormComponent,
        AdminNewsUdatePutformComponent,
        AdminNewsletterComponent,
        AdminNewsletterDeleteformComponent,
        AdminNewsletterFormComponent,
        AdminNewsletterFormUpdateComponent,
        AdminAddJobUpdateComponent,
        AdminAddSpotlightDeleteComponent,
        AdminAddSpotlightUpdateComponent,
        InternsHomeComponent,
        DetailsFormComponent,
        ExamplePdfViewerComponent,
        DashCardComponent,
        AdminAddRoleComponent,
        AdminUsersComponent,
        AdminUsersWidgetsComponent,
       
    ],
    providers: [
        ServiceService,
        HttpServiceService,
        PermissionsServiceService,
        DashboardDataService,
        SearchService,
        InternsService,
        DashboardDataService, CheckboxService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpinterceptorInterceptor,
            multi: true,
        },
        CurrencyPipe,
        DecimalPipe,
    ],
    bootstrap: [AppComponent],
    imports: [
        MatExpansionModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatTooltipModule,
        MatDialogModule,
        MatBadgeModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatSortModule,
        MatToolbarModule,
        MatInputModule,
        MatCardModule,
        MatSidenavModule,
        MatMenuModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatOptionModule,
        MatExpansionModule,
        MatListModule,
        MatDividerModule,
        FormsModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatProgressBarModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatStepperModule,
        MatSliderModule,
        NgApexchartsModule,
        NgChartsModule,
        SkillsComponent,
        FontAwesomeModule,
        ScrollingModule,
        MatProgressSpinnerModule,
        DonorGraphComponent,
        MinorDonorsGraphComponent,
        ToastrModule.forRoot(),
        NgbModule,
        MatAutocompleteModule,
        NgSelectModule,
        NgxExtendedPdfViewerModule
        ]
})
export class AppModule {}
