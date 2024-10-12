'use client'
import { Formik } from 'formik'
import { ObjectSchema, string } from 'yup'

const validationSchema = new ObjectSchema({
    email: string().required(),
    password: string().required()
})

function Auth() {


    return (
        <div className="w-[80%] h-fit flex flex-col gap-[3em]">
            <span className="font-medium text-[32px] text-black">Admin Sign-in</span>

            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={validationSchema}
                onSubmit={({ email, password }) => { }}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                    <div className="w-full h-fit flex flex-col gap-[1.5em]">
                        {/* //!Email */}
                        <div className="w-full h-[60px] flex items-center gap-[10px] relative">
                            {/* //!Overlay */}
                            <svg className="w-[16px] h-[20px] text-747474 absolute top-[20px] left-[10px]" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 9C10.2091 9 12 7.20914 12 5C12 2.79086 10.2091 1 8 1C5.79086 1 4 2.79086 4 5C4 7.20914 5.79086 9 8 9Z" stroke="#747474" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 11H10C12.76 11 15 13.24 15 16V17C15 18.1 14.1 19 13 19H3C1.9 19 1 18.1 1 17V16C1 13.24 3.24 11 6 11Z" stroke="#747474" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {/* //!Overlay */}

                            <input
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                className={`w-full h-full rounded-[10px] pl-[40px]
                          border-[1px] ${errors.email && touched.email ? 'border-red-500' : 'border-d7d7d7'} active:border-d7d7d7 focus:border-d7d7d7
                          outline-none active:outline-none focus-within:outline-none focus:outline-none
                          `}
                                placeholder="Email"
                                type="text" />
                        </div>
                        {/* //!Email */}

                        {/* //!Password */}
                        <div className="w-full h-[60px] flex items-center gap-[10px] relative">
                            {/* //!Overlay */}
                            <svg className="w-[24px] h-[24px] text-747474 absolute top-[20px] left-[10px]" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.66 20.56L10 23L6.34 20.56C3.01 18.34 1 14.59 1 10.58V6L10 1L19 6V10.58C19 14.59 16.99 18.34 13.66 20.56Z" stroke="#747474" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10 1V18" stroke="#747474" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {/* //!Overlay */}

                            <input
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                className={`w-full h-full rounded-[10px] pl-[40px]
                          border-[1px] ${errors.password && touched.password ? 'border-red-500' : 'border-d7d7d7'} active:border-d7d7d7 focus:border-d7d7d7
                          outline-none active:outline-none focus-within:outline-none focus:outline-none
                          `}
                                placeholder="Password"
                                type="text" />
                        </div>
                        {/* //!Password */}

                        {/* //!Signin CTA */}
                        <div onClick={() => handleSubmit()} className="col-span-1 h-[50px] cursor-pointer bg-5D5FEF flex items-center justify-center gap-[10px] rounded-[10px] text-white font-medium text-[14px] leading-[18px]">
                            Sign In
                        </div>
                        {/* //!Signin CTA */}
                    </div>
                )}
            </Formik>
        </div>
    )
}

export default Auth;