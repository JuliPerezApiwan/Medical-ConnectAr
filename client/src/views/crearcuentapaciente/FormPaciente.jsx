import {React,useEffect} from 'react'
import { useSelector } from 'react-redux'
import "./FormPaciente.css"
import {addPacient, totalUsers} from "../../redux/actions/actions"
import {useForm} from "react-hook-form"
import {useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux'
import moment from "moment";

const Formpaciente = () => {
  const InfoUser= useSelector(state=>state.userLogin)
  const totalUser= useSelector(state=>state.totalUsers)
  const paises=["Afganistán","Albania","Alemania","Andorra","Angola","Antigua y Barbuda","Arabia Saudita","Argelia","Argentina","Armenia","Australia","Austria","Azerbaiyán","Bahamas","Bangladés","Barbados","Baréin","Bélgica","Belice","Benín","Bielorrusia","Birmania","Bolivia","Bosnia y Herzegovina","Botsuana","Brasil","Brunéi","Bulgaria","Burkina Faso","Burundi","Bután","Cabo Verde","Camboya","Camerún","Canadá","Catar","Chad","Chile","China","Chipre","Ciudad del Vaticano","Colombia","Comoras","Corea del Norte","Corea del Sur","Costa de Marfil","Costa Rica","Croacia","Cuba","Dinamarca","Dominica","Ecuador","Egipto","El Salvador","Emiratos Árabes Unidos","Eritrea","Eslovaquia","Eslovenia","España","Estados Unidos","Estonia","Etiopía","Filipinas","Finlandia","Fiyi","Francia","Gabón","Gambia","Georgia","Ghana","Granada","Grecia","Guatemala","Guyana","Guinea","Guinea ecuatorial","Guinea-Bisáu","Haití","Honduras","Hungría","India","Indonesia","Irak","Irán","Irlanda","Islandia","Islas Marshall","Islas Salomón","Israel","Italia","Jamaica","Japón","Jordania","Kazajistán","Kenia","Kirguistán","Kiribati","Kuwait","Laos","Lesoto","Letonia","Líbano","Liberia","Libia","Liechtenstein","Lituania","Luxemburgo","Madagascar","Malasia","Malaui","Maldivas","Malí","Malta","Marruecos","Mauricio","Mauritania","México","Micronesia","Moldavia","Mónaco","Mongolia","Montenegro","Mozambique","Namibia","Nauru","Nepal","Nicaragua","Níger","Nigeria","Noruega","Nueva Zelanda","Omán","Países Bajos","Pakistán","Palaos","Palestina","Panamá","Papúa Nueva Guinea","Paraguay","Perú","Polonia","Portugal","Reino Unido","República Centroafricana","República Checa","República de Macedonia","República del Congo","República Democrática del Congo","República Dominicana","República Sudafricana","Ruanda","Rumanía","Rusia","Samoa","San Cristóbal y Nieves","San Marino","San Vicente y las Granadinas","Santa Lucía","Santo Tomé y Príncipe","Senegal","Serbia","Seychelles","Sierra Leona","Singapur","Siria","Somalia","Sri Lanka","Suazilandia","Sudán","Sudán del Sur","Suecia","Suiza","Surinam","Tailandia","Tanzania","Tayikistán","Timor Oriental","Togo","Tonga","Trinidad y Tobago","Túnez","Turkmenistán","Turquía","Tuvalu","Ucrania","Uganda","Uruguay","Uzbekistán","Vanuatu","Venezuela","Vietnam","Yemen","Yibuti","Zambia","Zimbabue"];
  // const barrios=['Agronomía','Almagro','Balvanera','Barracas','Belgrano','Boedo','Caballito','Chacarita','Coghlan','Colegiales','Constitución','Flores','Floresta','La Boca','La Paternal','Liniers','Mataderos','Monte Castro','Montserrat','Nueva Pompeya','Nuñez','Palermo','Parque Avellaneda','Parque Chacabuco','Parque Chas','Parque Patricios','Puerto Madero','Recoleta','Retiro','Saavedra','San Cristóbal','San Nicolás','San Telmo','Versalles','Villa Crespo','Villa Devoto','Villa General Mitre','Villa Lugano','Villa Luro','Villa Ortúzar','Villa Pueyrredón','Villa Real','Villa Riachuelo','Villa Santa Rita','Villa Soldati','Villa Urquiza','Villa del Parque','Vélez Sarsfield']
  const arrProvincias = ["Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes", "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucumán"];

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, watch, formState: {errors} , handleSubmit, } = useForm();

  useEffect(() => {
    dispatch(totalUsers())
  }, [])

  const submit1 = (data) =>{
   dispatch(addPacient(data))
   alert("El usuario a sido creado")
   navigate("/ingresopaciente")
 }

 const validarEmail = (value) => {
  if (totalUser.some((item) => item.email === value)) {
    return "El email ya esta en uso . Por favor, introduzca otro email";
  }
  return true;
};

const validarDocumento = (value) => {
  if (totalUser.some((item) => item.numero_de_documento === value)) {
    return "El número de documento ya esta en uso. Por favor, introduzca otro número de documento";
  }
  return true;
};

const today = moment();
const eighteenYearsAgo = moment().subtract(18, "years");

const isValidDate = (inputDate) => {
  const date = moment(inputDate, "YYYY-MM-DD", true); // Parse date string with format YYYY-MM-DD
  return (
    date.isValid() &&
    eighteenYearsAgo.isSameOrAfter(date) &&
    today.isAfter(date)
  );
};
  
  return (
    <div>
      <div className="container text-center">
        <div className="row row-cols-2">
          <div className="col-12">
            <h2 className="subtitulos">
              Registrate llenando los campos y accede a <br /> todos nuestros
              servicios
            </h2>
          </div>
        </div>
      </div>

      <div className="container text-center ">
        <div className="row row-cols-2 ">
          <div className="col-6 ">
            <br />
            <br />
            <br />
            <form className="forma" onSubmit={handleSubmit(submit1)}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  {...register("nombre",{
                    required:true,
                    maxLength:25
                  })}
                /> {errors.nombre?.type === "required" && <p  className='errorp'>El campo nombre es requerido</p>}
                {errors.nombre?.type === "maxLength" && <p  className='errorp'>El campo nombre debe tener maximo 25 caracteres</p>}
                <label htmlFor="floatingInput">Nombre</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  {...register("apellido",{
                    required:true,
                    maxLength:25
                  })}
                />
                {errors.apellido?.type === "required" && <p className='errorp'>El campo apellido es requerido</p>}
                {errors.apellido?.type === "maxLength" && <p className='errorp'>El campo apellido debe tener maximo 25 caracteres</p>}
                <label htmlFor="floatingInput">Apellido</label>
              </div>
              <div className="form-floating select1">
                <select
                  className="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                  {...register("tipo_de_documento",{
                    required:true,
                  })}
                >
                  <option  value="" defaultValue>---</option>
                  <option value="DNI">DNI</option>
                  <option value="CUIL">CUIL</option>
                </select>
                {errors.tipo_de_documento?.type === "required" && <p className='errorp'>El campo Tipo de Documento es requerido</p>}
                <label htmlFor="floatingSelect">Tipo de documento</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  {...register("numero_de_documento",{
                    required:true,
                    maxLength:11,
                    validate: {
                      validarDocumento,
                      CUIL: value => watch("tipo_de_documento") === "CUIL" ? value.length === 11 : true,
                      DNI: value => watch("tipo_de_documento") === "DNI" ? value.length === 8 : true,} 
                  })}
                />
                 {errors.numero_de_documento?.type === "required" && <p className='errorp'>El campo numero de documento es requerido</p>}
                {errors.numero_de_documento?.type === "maxLength" && <p className='errorp'>El campo numero de documento debe tener maximo 11 caracteres</p>}
                {errors.numero_de_documento?.type === "CUIL" && <p className='errorp'>Si es cuil debe contener 11 numeros</p>}
                {errors.numero_de_documento?.type === "DNI" && <p className='errorp'>Si es dni debe contener 8 numeros</p>}
                {errors.numero_de_documento && <p className='errorp'>{errors.numero_de_documento.message}</p>}
                <label htmlFor="floatingInput">Numero de documento</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="date"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  {...register("fecha_de_nacimiento",{
                    required:true,
                    validate: isValidDate
                  })}
                />
                {errors.fecha_de_nacimiento?.type === "required" && <p className='errorp'>El campo fecha de nacimiento es requerido</p>}
                {errors.fecha_de_nacimiento?.type === "validate" && <p className='errorp'>La persona debe tener al menos 18 años</p>}
                <label htmlFor="floatingInput">Fecha de nacimiento</label>
              </div>
              <div className="form-floating select1">
                <select
                  className="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                  {...register("sexo",{
                    required:true,
                  })}
                >
                  <option value="" defaultValue>
                    ---
                  </option>
                  <option value="masculino" >
                    Masculino
                  </option>
                  <option value="femenino" >
                    Femenino
                  </option>
                  <option value="otro" >
                    Otro
                  </option>
                </select>
                {errors.sexo?.type === "required" && <p className='errorp'>El campo sexo es requerido</p>}
                <label htmlFor="floatingSelect">Sexo</label>
              </div>
              <div className="form-floating select1">
                <select
                  className="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                  {...register("pais_de_origen",{
                    required:true,
                  })}
                >
                  <option value="" defaultValue>
                    ---
                  </option>
                  {paises.map((pais, index) => (
                    <option key={index} value={pais}>
                      {pais}
                    </option>
                  ))}
                </select>
                {errors.pais_de_origen?.type === "required" && <p className='errorp'>El campo pais de origen es requerido</p>}
                <label htmlFor="floatingSelect">Pais de origen</label>
              </div>
              
              <div className="form-floating select1">
                <select
                  className="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                  {...register("provincia",{
                    required:true,
                  })}
                >
                  <option value="" defaultValue>
                    ---
                  </option>
                  {arrProvincias.map((prov,index)=>{
                    return <option key={index} value={prov}>{prov}</option>
                  })}
                
                </select>
                {errors.provincia?.type === "required" && <p className='errorp'>El campo provincia es requerido</p>}
                <label htmlFor="floatingSelect">Provincia de Residencia</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  {...register("ciudad",{
                    required:true,
                  })}
                />
                {errors.ciudad?.type === "required" && <p className='errorp'>El campo ciudad es requerido</p>}
                <label htmlFor="floatingInput">Ciudad</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  {...register("nacionalidad",{
                    required:true,
                  })}
                />
                 {errors.nacionalidad?.type === "required" && <p className='errorp'>El campo nacionalidad es requerido</p>}
                <label htmlFor="floatingInput">Nacionalidad</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  {...register("domicilio",{
                    required:true,
                  })}
                />
                {errors.domicilio?.type === "required" && <p className='errorp'>El campo domicilio es requerido</p>}
                <label htmlFor="floatingInput">Domicilio</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Ingresa tu número de teléfono"
                  {...register("telefono",{
                    required:true,
                  })}
                />
                  {errors.telefono?.type === "required" && <p className='errorp'>El campo telefono es requerido</p>}
                <label htmlFor="floatingInput">
                  Telefono
                </label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Ingresa tu email"
                  {...register("email",{
                    required:true,
                    pattern:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    validate:validarEmail
                  })}
                />
                 {errors.email?.type === "required" && <p className='errorp'>El campo email es requerido</p>}
                 {errors.email?.type === "pattern" && <p className='errorp'>El formato del email es incorrecto</p>}
                 {errors.email && <p className='errorp'>{errors.email.message}</p>}
                <label htmlFor="floatingInput">Email</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control select1"
                  id="floatingPassword"
                  placeholder="Password"
                  {...register("contraseña",{
                    required:true,
                    pattern:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
                  })}
                />
                 {errors.contraseña?.type === "required" && <p className='errorp'>El campo contraseña es requerido</p>}
                 {errors.contraseña?.type === "pattern" && <p className='errorp'>El formato de la contraseña es incorrecto(ingrese al menos 8 caracteres en total, con numero, una letra minuscula y otra mayus al menos 1 vez)</p>}
                <label htmlFor="floatingPassword">Contraseña</label>
              </div>
              <div className="form-floating ">
                <input
                  type="password"
                  className="form-control "
                  id="floatingPassword"
                  placeholder="Password"
                  {...register("contrasenacheck", {
                    required: true,
                    validate: value => value === watch("contraseña","") ? true : "Las contraseñas no coinciden"},
                    { shouldUnregister: true }
                  )}
                />
                 {errors.contrasenacheck?.type === "required" && <p className='errorp'>El campo confirmar contraseña es requerido</p>}
                 {errors.contrasenacheck?.message && <p className='errorp'>{errors.contrasenacheck.message}</p>}
                <label htmlFor="floatingPassword">Confirmar Contraseña</label>
              </div>
              <br />
              <br />
              <button className="btnsubmit btn-lg" type="submit">
                Crear tu perfil!
              </button>
            </form>
          </div>

          <div className="col-6">
            <br />
            <br />
            <br />
            <br />
           <div className='acomodarparrafo'>
            <div>
            <p className="text-center fw-medium">
              ✔ Atiendase con los mas profesionales medicos que se encuentren disponibles la momento de su consulta!
            </p>
            </div>
            <div>
            <p className='text-center fw-medium'>
            ✔
              87% de los profesionales asegura haber mejorado el rendimiento de
              su consulta médica gracias a Medical Connect
            </p>
            </div>
            <div className='presagado'>
            <p className='text-center fw-medium'>
            ✔ 9 de cada 10 especialistas recomendarían  Medical Connect a otro
              profesional de la salud. <br /> 
            </p>
            </div>
           </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Formpaciente

