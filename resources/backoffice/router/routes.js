export default [
    ...applyRules(['guest'], [{
        path: '/',
        component: require('$backoffice/auth/AuthWrapper').default,
        redirect: { name: 'login' },
        children: [
            { path: '/login', name: 'login', component: require('$backoffice/auth/login/Login').default },
            { path: '/register', name: 'register', component: require('$backoffice/auth/register/Register').default },
            {
                path: '/password',
                component: require('$backoffice/auth/password/PasswordWrapper').default,
                children: [
                    { path: '', name: 'forgot', component: require('$backoffice/auth/password/password-forgot/PasswordForgot').default },
                    { path: 'reset/:token', name: 'reset', component: require('$backoffice/auth/password/password-reset/PasswordReset').default }
                ]
            }
        ]
    }, ]),
    ...applyRules(['auth'], [{
        path: '/',
        component: require('$backoffice/admin/AdminWrapper').default,
        children: [
            { path: '', name: 'index', redirect: { name: 'home' } },
            {
                path: '/home',
                component: require('$backoffice/admin/home/HomeWrapper').default,
                children: [
                    { path: '', name: 'home', component: require('$backoffice/admin/home/Home').default },
                ]
            },
            {
                path: '/profile',
                component: require('$backoffice/admin/profile/ProfileWrapper').default,
                children: [
                    { path: '', name: 'profile', component: require('$backoffice/admin/profile/Profile').default },
                    { path: '/edit', name: 'profile-edit', component: require('$backoffice/admin/profile/edit/ProfileEdit').default }
                ]
            },
            {
                path: '/appointments',
                component: require('$backoffice/admin/appointment/AppointmentWrapper').default,
                children: [
                    { path: '', name: 'appointments', component: require('$backoffice/admin/appointment/Appointment').default },

                ]
            },
            {
                path: '/sales',
                component: require('$backoffice/admin/sale/SaleWrapper').default,
                children: [
                    { path: '', name: 'sales', component: require('$backoffice/admin/sale/Sale').default },

                ]
            },
            {
                path: '/customers',
                component: require('$backoffice/admin/customer/CustomerWrapper').default,
                children: [
                    { path: '', name: 'customers', component: require('$backoffice/admin/customer/Customer').default },

                ]
            },
            {
                path: '/vendors',
                component: require('$backoffice/admin/vendor/VendorWrapper').default,
                children: [
                    { path: '', name: 'vendors', component: require('$backoffice/admin/vendor/Vendor').default },

                ]
            },
            {
                path: '/purchases',
                component: require('$backoffice/admin/purchase/PurchaseWrapper').default,
                children: [
                    { path: '', name: 'purchases', component: require('$backoffice/admin/purchase/Purchase').default },

                ]
            },
            {
                path: '/products',
                component: require('$backoffice/admin/product/ProductWrapper').default,
                children: [
                    { path: '/products/standard', name: 'products', component: require('$backoffice/admin/product/Product').default },
                    { path: '/products/variant', name: 'variants', component: require('$backoffice/admin/product/Variant').default },
                    { path: '/products/composite', name: 'composites', component: require('$backoffice/admin/product/Composite').default },
                ]
            },
            {
                path: '/services',
                component: require('$backoffice/admin/service/ServiceWrapper').default,
                children: [
                    { path: '/services/standard', name: 'services.standard', component: require('$backoffice/admin/service/Standard').default },
                    { path: '/services/variant', name: 'services.variant', component: require('$backoffice/admin/service/Variant').default },
                    { path: '/services/composite', name: 'services.composite', component: require('$backoffice/admin/service/Composite').default },

                ]
            },
            {
                path: '/users',
                component: require('$backoffice/admin/user/UserWrapper').default,
                children: [
                    { path: '', name: 'users', component: require('$backoffice/admin/user/User').default },

                ]
            },
            {
                path: '/setting',
                component: require('$backoffice/admin/setting/SettingWrapper').default,
                children: [
                    { path: '', name: 'setting', component: require('$backoffice/admin/setting/Setting').default },
                    { path: '/setting/stores', name: 'setting.stores', component: require('$backoffice/admin/setting/Stores').default },
                    { path: '/setting/terminals', name: 'setting.terminals', component: require('$backoffice/admin/setting/Terminals').default },
                    { path: '/setting/categories', name: 'setting.categories', component: require('$backoffice/admin/setting/Categories').default },
                    { path: '/setting/taxes', name: 'setting.taxes', component: require('$backoffice/admin/setting/Taxes').default },
                    { path: '/setting/service', name: 'setting.service', component: require('$backoffice/admin/setting/Service').default },
                    { path: '/setting/commissions', name: 'setting.commissions', component: require('$backoffice/admin/setting/Commissions').default },
                    { path: '/setting/company', name: 'setting.company', component: require('$backoffice/admin/setting/Company').default },
                ]
            },
            {
                path: '/reports',
                component: require('$backoffice/admin/report/ReportWrapper').default,
                children: [
                    { path: '', name: 'reports', component: require('$backoffice/admin/report/Report').default },
                ]
            },
        ]
    }, ]),
    { path: '*', redirect: { name: 'index' } }
]

function applyRules(rules, routes) {
    for (let i in routes) {
        routes[i].meta = routes[i].meta || {}

        if (!routes[i].meta.rules) {
            routes[i].meta.rules = []
        }
        routes[i].meta.rules.unshift(...rules)

        if (routes[i].children) {
            routes[i].children = applyRules(rules, routes[i].children)
        }
    }

    return routes
}
