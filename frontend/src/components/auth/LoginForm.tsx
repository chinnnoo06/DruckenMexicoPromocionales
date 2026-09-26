"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { FaCircleExclamation, FaEye, FaEyeSlash, FaRightToBracket } from 'react-icons/fa6';

import { LoginFormSchema, TLoginForm } from '@/schemas/auth/login.form.schemas';
import { primaryButton } from '@/utils/styles/button';
import { errorSpan, input, label } from '@/utils/styles/form';
import { usePasswordVisibility } from '@/hooks/usePasswordVisibility';
import { useActionStatus } from '@/hooks/useActionStatus';
import { login } from '@/actions/login.action';
import { toast } from "react-toastify";

export const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(LoginFormSchema)
    })

    const { loading, startLoading, stopLoading } = useActionStatus()
    const { showPassword, handlePasswordVisibility, inputTypePassword } = usePasswordVisibility()

    const onSubmit = async (data: TLoginForm) => {
        startLoading()
        const res = await login(data)
        stopLoading()

        if (res?.error) toast.error(res.error)
    }

    return (
        <form className='space-y-8' onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="form-group">
                <label htmlFor="username" className={label}>Usuario </label>
                <input type="text" id="username" autoComplete="username" {...register("username")} placeholder="Escribe tu usuario" className={input} />

                {errors.username &&
                    <span className={errorSpan}>
                        <FaCircleExclamation className="inline-block h-4 w-4 lg:h-5 lg:w-5 mr-1" />
                        {errors.username.message}
                    </span>
                }
            </div>

            <div className="form-group">
                <label htmlFor="password" className={label}>Contraseña </label>

                <div className="relative">
                    <input type={inputTypePassword} id="password" autoComplete="current-password" {...register("password")} placeholder="Escribe tu contraseña" className={`${input} pr-11`} />

                    <button
                        type="button"
                        onClick={handlePasswordVisibility}
                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        aria-pressed={showPassword}
                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-[#9F531B] hover:text-[#7C3E13]"
                    >
                        {showPassword
                            ? <FaEyeSlash className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
                            : <FaEye className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
                        }
                    </button>
                </div>

                {errors.password &&
                    <span className={errorSpan}>
                        <FaCircleExclamation className="inline-block h-4 w-4 lg:h-5 lg:w-5 mr-1" />
                        {errors.password.message}
                    </span>
                }
            </div>

            <button type="submit" disabled={loading} className={`${primaryButton} flex w-full items-center justify-center gap-2.5`}>
                <FaRightToBracket className="w-3.5 h-3.5 lg:w-4.5 lg:h-4.5" />
                {loading ? 'Entrando...' : 'Entrar'}
            </button>
        </form>
    )
}
