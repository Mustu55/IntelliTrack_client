import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from '../slices/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || '/api',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token || localStorage.getItem('intellitrack_token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    headers.set('X-Intelligence-Enclave', 'INTELLITRACK-SEC-FIPS140');
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // Attempt token refresh
    const refreshToken = api.getState().auth.refreshToken || localStorage.getItem('intellitrack_refresh_token');
    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: '/auth/refresh',
          method: 'POST',
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult?.data?.success && refreshResult.data.data?.accessToken) {
        api.dispatch(
          setCredentials({
            accessToken: refreshResult.data.data.accessToken,
            refreshToken: refreshResult.data.data.refreshToken || refreshToken,
            user: api.getState().auth.user,
          })
        );
        // Retry initial request
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'User',
    'Case',
    'Entity',
    'Network',
    'Evidence',
    'Lead',
    'Timeline',
    'Location',
    'Report',
    'Dashboard',
    'Audit',
  ],
  endpoints: (builder) => ({
    // Auth Endpoints
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User', 'Dashboard'],
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    logoutApi: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
    getMe: builder.query({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),

    // Dashboard Endpoints
    getDashboardSummary: builder.query({
      query: () => '/dashboard/summary',
      providesTags: ['Dashboard'],
    }),
    getRecentActivity: builder.query({
      query: () => '/dashboard/recent-activity',
      providesTags: ['Dashboard', 'Audit'],
    }),

    // Cases Endpoints
    getCases: builder.query({
      query: (params) => ({
        url: '/cases',
        params,
      }),
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ caseId }) => ({ type: 'Case', id: caseId })), { type: 'Case', id: 'LIST' }]
          : [{ type: 'Case', id: 'LIST' }],
    }),
    getCaseById: builder.query({
      query: (id) => `/cases/${id}`,
      providesTags: (result, error, id) => [{ type: 'Case', id }],
    }),
    createCase: builder.mutation({
      query: (body) => ({
        url: '/cases',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Case', id: 'LIST' }, 'Dashboard'],
    }),
    updateCase: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/cases/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Case', id }, { type: 'Case', id: 'LIST' }, 'Dashboard'],
    }),
    deleteCase: builder.mutation({
      query: (id) => ({
        url: `/cases/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Case', id: 'LIST' }, 'Dashboard'],
    }),

    // Entities Endpoints
    getEntities: builder.query({
      query: (params) => ({
        url: '/entities',
        params,
      }),
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ entityId }) => ({ type: 'Entity', id: entityId })), { type: 'Entity', id: 'LIST' }]
          : [{ type: 'Entity', id: 'LIST' }],
    }),
    getEntityById: builder.query({
      query: (id) => `/entities/${id}`,
      providesTags: (result, error, id) => [{ type: 'Entity', id }],
    }),
    createEntity: builder.mutation({
      query: (body) => ({
        url: '/entities',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Entity', id: 'LIST' }, 'Network', 'Dashboard'],
    }),
    updateEntity: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/entities/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Entity', id }, { type: 'Entity', id: 'LIST' }, 'Network'],
    }),
    resolveCandidates: builder.query({
      query: (name) => `/entities/resolve/candidates?name=${encodeURIComponent(name)}`,
    }),

    // Network Endpoints
    getCaseNetwork: builder.query({
      query: ({ caseId, strongOnly } = {}) => ({
        url: '/network',
        params: { caseId, strongOnly },
      }),
      providesTags: ['Network'],
    }),

    // Leads Endpoints
    getLeads: builder.query({
      query: (params) => ({
        url: '/leads',
        params,
      }),
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ leadId }) => ({ type: 'Lead', id: leadId })), { type: 'Lead', id: 'LIST' }]
          : [{ type: 'Lead', id: 'LIST' }],
    }),
    getLeadById: builder.query({
      query: (id) => `/leads/${id}`,
      providesTags: (result, error, id) => [{ type: 'Lead', id }],
    }),
    updateLeadStatus: builder.mutation({
      query: ({ id, status, notes }) => ({
        url: `/leads/${id}/status`,
        method: 'PATCH',
        body: { status, notes },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Lead', id }, { type: 'Lead', id: 'LIST' }, 'Dashboard'],
    }),

    // Evidence Endpoints
    getEvidence: builder.query({
      query: (params) => ({
        url: '/evidence',
        params,
      }),
      providesTags: ['Evidence'],
    }),
    uploadEvidence: builder.mutation({
      query: (formData) => ({
        url: '/evidence',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Evidence', 'Dashboard'],
    }),
    verifyChain: builder.query({
      query: (caseId) => `/evidence/chain/verify/${caseId}`,
      providesTags: ['Evidence'],
    }),

    // Timeline Endpoints
    getTimelineEvents: builder.query({
      query: (params) => ({
        url: '/timeline',
        params,
      }),
      providesTags: ['Timeline'],
    }),

    // Location Endpoints
    getLocations: builder.query({
      query: (params) => ({
        url: '/locations',
        params,
      }),
      providesTags: ['Location'],
    }),

    // Reports Endpoints
    generateReport: builder.mutation({
      query: (body) => ({
        url: '/reports/generate',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Report', 'Audit'],
    }),

    // Audit Logs Endpoints
    getAuditLogs: builder.query({
      query: (params) => ({
        url: '/audit',
        params,
      }),
      providesTags: ['Audit'],
    }),

    // Users Endpoints (Admin)
    getUsers: builder.query({
      query: () => '/users',
      providesTags: ['User'],
    }),
    updateUserStatus: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/users/${id}/status`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutApiMutation,
  useGetMeQuery,
  useGetDashboardSummaryQuery,
  useGetRecentActivityQuery,
  useGetCasesQuery,
  useGetCaseByIdQuery,
  useCreateCaseMutation,
  useUpdateCaseMutation,
  useDeleteCaseMutation,
  useGetEntitiesQuery,
  useGetEntityByIdQuery,
  useCreateEntityMutation,
  useUpdateEntityMutation,
  useResolveCandidatesQuery,
  useGetCaseNetworkQuery,
  useGetLeadsQuery,
  useGetLeadByIdQuery,
  useUpdateLeadStatusMutation,
  useGetEvidenceQuery,
  useUploadEvidenceMutation,
  useVerifyChainQuery,
  useGetTimelineEventsQuery,
  useGetLocationsQuery,
  useGenerateReportMutation,
  useGetAuditLogsQuery,
  useGetUsersQuery,
  useUpdateUserStatusMutation,
} = apiSlice;
