import "@testing-library/jest-dom";
import { server } from "../mocks/server";

// Configura el servidor de mocks antes de todas las pruebas
beforeAll(() => server.listen());

// Resetea los handlers después de cada prueba para evitar efectos secundarios
afterEach(() => server.resetHandlers());

// Cierra el servidor de mocks después de todas las pruebas
afterAll(() => server.close());
//   }, [searchTerm]);
// 
//   return (
//     <nav className="bg-white shadow-md fixed w-full z-10">
//       {/* ...resto del código del componente Nav */}
//     </nav>
//   );
// };
// 
// export default Nav;