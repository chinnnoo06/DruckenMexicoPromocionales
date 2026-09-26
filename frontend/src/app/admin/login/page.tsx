import { LoginForm } from "@/components/auth/LoginForm";

export default function AdminLoginPage() {
  return (
    <section className="max-w-3xl mx-auto px-4 lg:px-8 pb-10 pt-30">
      <div className="mb-8">
        <span className="text-[11px] lg:text-[13px] font-semibold tracking-[0.18em] uppercase text-[#7C3E13]">
          Panel de administrador
        </span>
        <h2 className="mt-2 font-semibold text-4xl lg:text-5xl tracking-tight text-[#9F531B]">
          Iniciar Sesión
        </h2>
        <p className="mt-4 text-[#1A1615]/75 text-base lg:text-lg leading-relaxed">
          Ingresa tus credenciales correctamente para poder iniciar sesión
        </p>
      </div>

      <LoginForm />
    </section>
  );
}
