// This file is auto-generated by @hey-api/openapi-ts

import type { CancelablePromise } from './core/CancelablePromise'
import { OpenAPI } from './core/OpenAPI'
import { request as __request } from './core/request'
import type { $OpenApiTs } from './types.gen'

export class AuthService {
    /**
     * Register
     * @param data The data for the request.
     * @param data.requestBody
     * @returns SuccessResponse Successful Response
     * @throws ApiError
     */
    public static authRegister(data: $OpenApiTs['/auth/register']['post']['req']): CancelablePromise<$OpenApiTs['/auth/register']['post']['res'][201]> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/register',
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                400: 'Gebruiker bestaat al of email niet bevoegd',
                422: 'Validation Error',
                500: 'Interne serverfout bij het aanmaken van gebruiker'
            }
        })
    }

    /**
     * Activate Account
     * @param data The data for the request.
     * @param data.requestBody
     * @returns SuccessResponse Account geactiveerd
     * @throws ApiError
     */
    public static authActivateAccount(data: $OpenApiTs['/auth/activate_account']['post']['req']): CancelablePromise<$OpenApiTs['/auth/activate_account']['post']['res'][200]> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/activate_account',
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                400: 'Bad Request',
                422: 'Validation Error',
                500: 'Internal Server Error'
            }
        })
    }

    /**
     * Resent Activation Code
     * @param data The data for the request.
     * @param data.email
     * @returns unknown Successful Response
     * @throws ApiError
     */
    public static authResentActivationCode(data: $OpenApiTs['/auth/resent_activation_token/{email}']['get']['req']): CancelablePromise<$OpenApiTs['/auth/resent_activation_token/{email}']['get']['res'][200]> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/resent_activation_token/{email}',
            path: {
                email: data.email
            },
            errors: {
                422: 'Validation Error'
            }
        })
    }

    /**
     * Login
     * @param data The data for the request.
     * @param data.formData
     * @returns TokenResponse Successful Response
     * @throws ApiError
     */
    public static authLogin(data: $OpenApiTs['/auth/login']['post']['req']): CancelablePromise<$OpenApiTs['/auth/login']['post']['res'][200]> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login',
            formData: data.formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                401: 'Niet geautoriseerd',
                422: 'Validation Error'
            }
        })
    }

    /**
     * Refresh
     * @returns TokenResponse Successful Response
     * @throws ApiError
     */
    public static authRefresh(): CancelablePromise<$OpenApiTs['/auth/refresh']['get']['res'][200]> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/refresh',
            errors: {
                400: 'Ongeldige token scope of gebruiker niet gevonden',
                403: 'Refresh token ontbreekt of is verlopen'
            }
        })
    }

    /**
     * Forgot Password
     * @param data The data for the request.
     * @param data.email
     * @returns unknown Successful Response
     * @throws ApiError
     */
    public static authForgotPassword(data: $OpenApiTs['/auth/forgot_password/{email}']['get']['req']): CancelablePromise<$OpenApiTs['/auth/forgot_password/{email}']['get']['res'][200]> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/forgot_password/{email}',
            path: {
                email: data.email
            },
            errors: {
                422: 'Validation Error'
            }
        })
    }

    /**
     * Reset Password
     * @param data The data for the request.
     * @param data.requestBody
     * @returns unknown Successful Response
     * @throws ApiError
     */
    public static authResetPassword(data: $OpenApiTs['/auth/reset_password']['post']['req']): CancelablePromise<$OpenApiTs['/auth/reset_password']['post']['res'][200]> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/reset_password',
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                422: 'Validation Error'
            }
        })
    }

    /**
     * Logout
     * @returns unknown Successful Response
     * @throws ApiError
     */
    public static authLogout(): CancelablePromise<$OpenApiTs['/auth/logout']['post']['res'][200]> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/logout'
        })
    }

}

export class AllowedUsersService {
    /**
     * Get Allowed Users
     * @returns AllowedUserResponse Successful Response
     * @throws ApiError
     */
    public static allowedUsersGetAllowedUsers(): CancelablePromise<$OpenApiTs['/allowed_users/']['get']['res'][200]> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/allowed_users/'
        })
    }

    /**
     * Add Allowed User
     * @param data The data for the request.
     * @param data.requestBody
     * @returns AllowedUserResponse Successful Response
     * @throws ApiError
     */
    public static allowedUsersAddAllowedUser(data: $OpenApiTs['/allowed_users/']['post']['req']): CancelablePromise<$OpenApiTs['/allowed_users/']['post']['res'][201]> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/allowed_users/',
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                422: 'Validation Error'
            }
        })
    }

    /**
     * Get Allowed User
     * @param data The data for the request.
     * @param data.id
     * @returns AllowedUserResponse Successful Response
     * @throws ApiError
     */
    public static allowedUsersGetAllowedUser(data: $OpenApiTs['/allowed_users/{id}']['get']['req']): CancelablePromise<$OpenApiTs['/allowed_users/{id}']['get']['res'][200]> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/allowed_users/{id}',
            path: {
                id: data.id
            },
            errors: {
                422: 'Validation Error'
            }
        })
    }

    /**
     * Update Allowed User
     * @param data The data for the request.
     * @param data.id
     * @param data.requestBody
     * @returns unknown Successful Response
     * @throws ApiError
     */
    public static allowedUsersUpdateAllowedUser(data: $OpenApiTs['/allowed_users/{id}']['put']['req']): CancelablePromise<$OpenApiTs['/allowed_users/{id}']['put']['res'][200]> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/allowed_users/{id}',
            path: {
                id: data.id
            },
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                422: 'Validation Error'
            }
        })
    }

    /**
     * Delete Allowed User
     * @param data The data for the request.
     * @param data.id
     * @returns unknown Successful Response
     * @throws ApiError
     */
    public static allowedUsersDeleteAllowedUser(data: $OpenApiTs['/allowed_users/{id}']['delete']['req']): CancelablePromise<$OpenApiTs['/allowed_users/{id}']['delete']['res'][200]> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/allowed_users/{id}',
            path: {
                id: data.id
            },
            errors: {
                422: 'Validation Error'
            }
        })
    }

}

export class UsersService {
    /**
     * Get Me
     * @returns app__models__pydantic_models__auth__UserResponse Successful Response
     * @throws ApiError
     */
    public static usersGetMe(): CancelablePromise<$OpenApiTs['/users/me']['get']['res'][200]> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/me'
        })
    }

    /**
     * Update Me
     * @param data The data for the request.
     * @param data.requestBody
     * @returns app__models__pydantic_models__auth__UserResponse Successful Response
     * @throws ApiError
     */
    public static usersUpdateMe(data: $OpenApiTs['/users/me']['put']['req']): CancelablePromise<$OpenApiTs['/users/me']['put']['res'][200]> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/users/me',
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                422: 'Validation Error'
            }
        })
    }

}

export class WorkingHoursService {
    /**
     * Get All
     * @returns WorkingHoursResponse Successful Response
     * @throws ApiError
     */
    public static workingHoursGetAll(): CancelablePromise<$OpenApiTs['/working_hours/all']['get']['res'][200]> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/working_hours/all'
        })
    }

    /**
     * Get Working Hours Between Dates
     * @param data The data for the request.
     * @param data.fromDate
     * @param data.toDate
     * @returns WorkingHoursResponse Successful Response
     * @throws ApiError
     */
    public static workingHoursGetWorkingHoursBetweenDates(data: $OpenApiTs['/working_hours/between_dates/']['get']['req']): CancelablePromise<$OpenApiTs['/working_hours/between_dates/']['get']['res'][200]> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/working_hours/between_dates/',
            query: {
                from_date: data.fromDate,
                to_date: data.toDate
            },
            errors: {
                422: 'Validation Error'
            }
        })
    }

    /**
     * Get Year Overview
     * @param data The data for the request.
     * @param data.year
     * @returns WeekTotals Successful Response
     * @throws ApiError
     */
    public static workingHoursGetYearOverview(data: $OpenApiTs['/working_hours/year_overview/']['get']['req']): CancelablePromise<$OpenApiTs['/working_hours/year_overview/']['get']['res'][200]> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/working_hours/year_overview/',
            query: {
                year: data.year
            },
            errors: {
                422: 'Validation Error'
            }
        })
    }

    /**
     * Get Week Overview
     * @param data The data for the request.
     * @param data.fromDate
     * @param data.toDate
     * @returns WorkingHoursWeekOverviewResponse Successful Response
     * @throws ApiError
     */
    public static workingHoursGetWeekOverview(data: $OpenApiTs['/working_hours/week_overview/']['get']['req']): CancelablePromise<$OpenApiTs['/working_hours/week_overview/']['get']['res'][200]> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/working_hours/week_overview/',
            query: {
                from_date: data.fromDate,
                to_date: data.toDate
            },
            errors: {
                422: 'Validation Error'
            }
        })
    }

    /**
     * Update Working Hours Item
     * @param data The data for the request.
     * @param data.requestBody
     * @returns unknown Successful Response
     * @throws ApiError
     */
    public static workingHoursUpdateWorkingHoursItem(data: $OpenApiTs['/working_hours/']['put']['req']): CancelablePromise<$OpenApiTs['/working_hours/']['put']['res'][200]> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/working_hours/',
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                422: 'Validation Error'
            }
        })
    }

}

export class VakantiesService {
    /**
     * Get All Resources
     * @returns ResourceResponse Successful Response
     * @throws ApiError
     */
    public static vakantiesGetAllResources(): CancelablePromise<$OpenApiTs['/vakanties/resources']['get']['res'][200]> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vakanties/resources'
        })
    }

    /**
     * Add Vakantie
     * @param data The data for the request.
     * @param data.requestBody
     * @returns unknown Successful Response
     * @throws ApiError
     */
    public static vakantiesAddVakantie(data: $OpenApiTs['/vakanties/']['post']['req']): CancelablePromise<$OpenApiTs['/vakanties/']['post']['res'][200]> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vakanties/',
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                422: 'Validation Error'
            }
        })
    }

    /**
     * Add Vakantie For Other As Admin
     * @param data The data for the request.
     * @param data.requestBody
     * @param data.responseCode
     * @returns VakantieResponse Successful Response
     * @throws ApiError
     */
    public static vakantiesAddVakantieForOtherAsAdmin(data: $OpenApiTs['/vakanties/admin/add_vakantie_for_user']['post']['req']): CancelablePromise<$OpenApiTs['/vakanties/admin/add_vakantie_for_user']['post']['res'][200]> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vakanties/admin/add_vakantie_for_user',
            query: {
                response_code: data.responseCode
            },
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                422: 'Validation Error'
            }
        })
    }

    /**
     * Get Vakanties For Logged In User
     * @returns VakantieResponse Successful Response
     * @throws ApiError
     */
    public static vakantiesGetVakantiesForLoggedInUser(): CancelablePromise<$OpenApiTs['/vakanties/all_for_me']['get']['res'][200]> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vakanties/all_for_me'
        })
    }

    /**
     * Get All Vakanties
     * @returns VakantiesForCalendarResponse Successful Response
     * @throws ApiError
     */
    public static vakantiesGetAllVakanties(): CancelablePromise<$OpenApiTs['/vakanties/all']['get']['res'][200]> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vakanties/all'
        })
    }

    /**
     * Get All Vakanties Between Dates
     * @param data The data for the request.
     * @param data.startDate
     * @param data.endDate
     * @returns VakantieResponse Successful Response
     * @throws ApiError
     */
    public static vakantiesGetAllVakantiesBetweenDates(data: $OpenApiTs['/vakanties/all_between_dates']['get']['req']): CancelablePromise<$OpenApiTs['/vakanties/all_between_dates']['get']['res'][200]> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vakanties/all_between_dates',
            query: {
                start_date: data.startDate,
                end_date: data.endDate
            },
            errors: {
                422: 'Validation Error'
            }
        })
    }

    /**
     * Delete Vakantie
     * @param data The data for the request.
     * @param data.vakantieId
     * @returns unknown Successful Response
     * @throws ApiError
     */
    public static vakantiesDeleteVakantie(data: $OpenApiTs['/vakanties/{vakantie_id}']['delete']['req']): CancelablePromise<$OpenApiTs['/vakanties/{vakantie_id}']['delete']['res'][200]> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/vakanties/{vakantie_id}',
            path: {
                vakantie_id: data.vakantieId
            },
            errors: {
                422: 'Validation Error'
            }
        })
    }

}

export class AdminWorkingHoursService {
    /**
     * Get Year Overview
     * @param data The data for the request.
     * @param data.year
     * @param data.userId
     * @returns unknown Successful Response
     * @throws ApiError
     */
    public static adminWorkingHoursGetYearOverview(data: $OpenApiTs['/admin/working_hours/year_overview/']['get']['req']): CancelablePromise<$OpenApiTs['/admin/working_hours/year_overview/']['get']['res'][200]> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/working_hours/year_overview/',
            query: {
                year: data.year,
                user_id: data.userId
            },
            errors: {
                422: 'Validation Error'
            }
        })
    }

    /**
     * Get Week Overview
     * @param data The data for the request.
     * @param data.fromDate
     * @param data.toDate
     * @param data.userId
     * @returns WorkingHoursWeekOverviewResponse Successful Response
     * @throws ApiError
     */
    public static adminWorkingHoursGetWeekOverview(data: $OpenApiTs['/admin/working_hours/week_overview/']['get']['req']): CancelablePromise<$OpenApiTs['/admin/working_hours/week_overview/']['get']['res'][200]> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/working_hours/week_overview/',
            query: {
                from_date: data.fromDate,
                to_date: data.toDate,
                user_id: data.userId
            },
            errors: {
                422: 'Validation Error'
            }
        })
    }

    /**
     * Release Working Hours
     * @param data The data for the request.
     * @param data.requestBody
     * @returns unknown Successful Response
     * @throws ApiError
     */
    public static adminWorkingHoursReleaseWorkingHours(data: $OpenApiTs['/admin/working_hours/release']['put']['req']): CancelablePromise<$OpenApiTs['/admin/working_hours/release']['put']['res'][200]> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/working_hours/release',
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                422: 'Validation Error'
            }
        })
    }

}

export class AdminRolesService {
    /**
     * Get All Roles
     * @returns RoleResponse Successful Response
     * @throws ApiError
     */
    public static adminRolesGetAllRoles(): CancelablePromise<$OpenApiTs['/admin/roles/']['get']['res'][200]> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/roles/'
        })
    }

    /**
     * Create Role
     * @param data The data for the request.
     * @param data.requestBody
     * @returns RoleResponse Successful Response
     * @throws ApiError
     */
    public static adminRolesCreateRole(data: $OpenApiTs['/admin/roles/']['post']['req']): CancelablePromise<$OpenApiTs['/admin/roles/']['post']['res'][200]> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/roles/',
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                422: 'Validation Error'
            }
        })
    }

    /**
     * Delete Role
     * @param data The data for the request.
     * @param data.roleId
     * @returns unknown Successful Response
     * @throws ApiError
     */
    public static adminRolesDeleteRole(data: $OpenApiTs['/admin/roles/{role_id}']['delete']['req']): CancelablePromise<$OpenApiTs['/admin/roles/{role_id}']['delete']['res'][200]> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/roles/{role_id}',
            path: {
                role_id: data.roleId
            },
            errors: {
                422: 'Validation Error'
            }
        })
    }

}

export class AdminUsersService {
    /**
     * Get All Users
     * @returns app__models__pydantic_models__users__UserResponse Successful Response
     * @throws ApiError
     */
    public static adminUsersGetAllUsers(): CancelablePromise<$OpenApiTs['/admin/users/']['get']['res'][200]> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/users/'
        })
    }

    /**
     * Get User
     * @param data The data for the request.
     * @param data.userId
     * @returns app__models__pydantic_models__users__UserResponse Successful Response
     * @throws ApiError
     */
    public static adminUsersGetUser(data: $OpenApiTs['/admin/users/{user_id}']['get']['req']): CancelablePromise<$OpenApiTs['/admin/users/{user_id}']['get']['res'][200]> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/users/{user_id}',
            path: {
                user_id: data.userId
            },
            errors: {
                422: 'Validation Error'
            }
        })
    }

    /**
     * Update User
     * @param data The data for the request.
     * @param data.userId
     * @param data.requestBody
     * @returns app__models__pydantic_models__users__UserResponse Successful Response
     * @throws ApiError
     */
    public static adminUsersUpdateUser(data: $OpenApiTs['/admin/users/{user_id}']['put']['req']): CancelablePromise<$OpenApiTs['/admin/users/{user_id}']['put']['res'][200]> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/users/{user_id}',
            path: {
                user_id: data.userId
            },
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                422: 'Validation Error'
            }
        })
    }

    /**
     * Delete User
     * @param data The data for the request.
     * @param data.userId
     * @returns unknown Successful Response
     * @throws ApiError
     */
    public static adminUsersDeleteUser(data: $OpenApiTs['/admin/users/{user_id}']['delete']['req']): CancelablePromise<$OpenApiTs['/admin/users/{user_id}']['delete']['res'][200]> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/users/{user_id}',
            path: {
                user_id: data.userId
            },
            errors: {
                422: 'Validation Error'
            }
        })
    }

    /**
     * Add Role To User
     * @param data The data for the request.
     * @param data.requestBody
     * @returns app__models__pydantic_models__users__UserResponse Successful Response
     * @throws ApiError
     */
    public static adminUsersAddRoleToUser(data: $OpenApiTs['/admin/users/add_role_to_user/']['post']['req']): CancelablePromise<$OpenApiTs['/admin/users/add_role_to_user/']['post']['res'][200]> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/users/add_role_to_user/',
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                422: 'Validation Error'
            }
        })
    }

    /**
     * Remove Role From User
     * @param data The data for the request.
     * @param data.requestBody
     * @returns app__models__pydantic_models__users__UserResponse Successful Response
     * @throws ApiError
     */
    public static adminUsersRemoveRoleFromUser(data: $OpenApiTs['/admin/users/remove_role_from_user/']['delete']['req']): CancelablePromise<$OpenApiTs['/admin/users/remove_role_from_user/']['delete']['res'][200]> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/users/remove_role_from_user/',
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                422: 'Validation Error'
            }
        })
    }

}

export class AdminAddressService {
    /**
     * Update User Address
     * @param data The data for the request.
     * @param data.userId
     * @param data.requestBody
     * @returns app__models__pydantic_models__auth__UserResponse Successful Response
     * @throws ApiError
     */
    public static adminAddressUpdateUserAddress(data: $OpenApiTs['/admin/address/{user_id}']['put']['req']): CancelablePromise<$OpenApiTs['/admin/address/{user_id}']['put']['res'][200]> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/admin/address/{user_id}',
            path: {
                user_id: data.userId
            },
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                422: 'Validation Error'
            }
        })
    }

}

export class AdminKlauwscoreService {
    /**
     * Upload Latest Scrape
     * @returns unknown Successful Response
     * @throws ApiError
     */
    public static adminKlauwscoreUploadLatestScrape(): CancelablePromise<$OpenApiTs['/admin/klauwscore/']['post']['res'][200]> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/klauwscore/'
        })
    }

    /**
     * Get Klauwscores
     * @param data The data for the request.
     * @param data.koenummer
     * @param data.behandeldatumStart
     * @param data.behandeldatumEnd
     * @returns KlauwScoreBase Successful Response
     * @throws ApiError
     */
    public static adminKlauwscoreGetKlauwscores(data: $OpenApiTs['/admin/klauwscore/']['get']['req'] = {}): CancelablePromise<$OpenApiTs['/admin/klauwscore/']['get']['res'][200]> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/klauwscore/',
            query: {
                koenummer: data.koenummer,
                behandeldatum_start: data.behandeldatumStart,
                behandeldatum_end: data.behandeldatumEnd
            },
            errors: {
                422: 'Validation Error'
            }
        })
    }

    /**
     * Download Klauwscores
     * @returns unknown Successful Response
     * @throws ApiError
     */
    public static adminKlauwscoreDownloadKlauwscores(): CancelablePromise<$OpenApiTs['/admin/klauwscore/csv']['get']['res'][200]> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/klauwscore/csv'
        })
    }

}