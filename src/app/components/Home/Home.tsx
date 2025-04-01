"use client";
const HomeComponents = () => {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6">
      {/* Hero Section */}
      <section className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-12 py-20">
        {/* Image */}
        <div className="w-full md:w-1/2 h-80 bg-white rounded-xl shadow-lg overflow-hidden">
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: "url(https://via.placeholder.com/400)",
            }}
          ></div>
        </div>
        {/* Info */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-900">Андрей</h1>
          <p className="mt-4 text-gray-600 text-lg">
            Начинающий программист, Frontend-разработчик, изучаю Fullstack.
          </p>
        </div>
      </section>
      <section className="w-full py-10 rounded-xl  shadow-md overflow-hidden">
        <div className="w-full flex whitespace-nowrap overflow-hidden relative">
          <div className="flex space-x-4 mr-1 animate-marquee">
            {[
              "ООП",
              "React",
              "Next.js",
              "TypeScript",
              "TailwindCSS",
              "Redux",
            ].map((item, index, arr) => (
              <p
                key={index}
                className="text-3xl font-bold text-gray-900 ml-1 hover:text-indigo-600 transition px-4"
              >
                {item} {index !== arr.length - 1 && " •"}
              </p>
            ))}
          </div>
        </div>
      </section>
      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(100%);
          }
        }
        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
      `}</style>
      <section className="w-full bg-white mt-2 max-w-full flex flex-col items-center gap-12 py-20">
        {/* Заголовок */}
        <h2 className="text-3xl font-bold text-gray-900 text-center w-full mb-12">
          Проекты
        </h2>
        {/* Проект 1 */}
        <div className="w-full flex flex-col md:flex-row items-center gap-12 mb-12">
          {/* Картинка */}
          <div className="w-full md:w-1/2 h-80 bg-white rounded-xl shadow-lg overflow-hidden">
            <div
              className="h-full w-full bg-cover bg-center"
              style={{
                backgroundImage: "url(https://via.placeholder.com/400)",
              }}
            ></div>
          </div>
          {/* Описание проекта */}
          <div className="w-full md:w-1/2 text-center md:text-left mt-6 md:mt-0">
            <h1 className="text-2xl font-bold text-gray-900">
              Название проекта 1
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum
              accusamus molestiae illo!
            </p>
            <button className="mt-4 inline-block px-8 py-3 text-black border-2 border-black rounded-xl font-semibold transition-all duration-300 relative overflow-hidden group hover:bg-black hover:text-white">
              Посмотреть проект
              <span className="absolute left-0 top-0 w-0 h-full bg-black transition-all duration-300 group-hover:w-full"></span>
            </button>
          </div>
        </div>
        {/* Проект 2 */}
        <div className="w-full flex flex-col md:flex-row items-center gap-12 mb-12">
          {/* Картинка */}
          <div className="w-full md:w-1/2 h-80 bg-white rounded-xl shadow-lg overflow-hidden">
            <div
              className="h-full w-full bg-cover bg-center"
              style={{
                backgroundImage: "url(https://via.placeholder.com/400)",
              }}
            ></div>
          </div>
          {/* Описание проекта */}
          <div className="w-full md:w-1/2 text-center md:text-left mt-6 md:mt-0">
            <h1 className="text-2xl font-bold text-gray-900">
              Название проекта 2
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum
              accusamus molestiae illo!
            </p>
            <button className="mt-4 inline-block px-8 py-3 text-black border-2 border-black rounded-xl font-semibold transition-all duration-300 relative overflow-hidden group hover:bg-black hover:text-white">
              Посмотреть проект
              <span className="absolute left-0 top-0 w-0 h-full bg-black transition-all duration-300 group-hover:w-full"></span>
            </button>
          </div>
        </div>
        {/* Проект 3 */}
        <div className="w-full flex flex-col md:flex-row items-center gap-12 mb-12">
          {/* Картинка */}
          <div className="w-full md:w-1/2 h-80 bg-white rounded-xl shadow-lg overflow-hidden">
            <div
              className="h-full w-full bg-cover bg-center"
              style={{
                backgroundImage: "url(https://via.placeholder.com/400)",
              }}
            ></div>
          </div>
          {/* Описание проекта */}
          <div className="w-full md:w-1/2 text-center md:text-left mt-6 md:mt-0">
            <h1 className="text-2xl font-bold text-gray-900">
              Название проекта 3
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum
              accusamus molestiae illo!
            </p>
            <button className="mt-4 inline-block px-8 py-3 text-black border-2 border-black rounded-xl font-semibold transition-all duration-300 relative overflow-hidden group hover:bg-black hover:text-white">
              Посмотреть проект
              <span className="absolute left-0 top-0 w-0 h-full bg-black transition-all duration-300 group-hover:w-full"></span>
            </button>
          </div>
        </div>
      </section>
      <section className="w-full max-w-6xl py-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          Будущий стек
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <span className="px-4 py-2 bg-gray-300 rounded-lg">Vue.js</span>
          <span className="px-4 py-2 bg-gray-300 rounded-lg">Docker</span>
          <span className="px-4 py-2 bg-gray-300 rounded-lg">Backend</span>
        </div>
      </section>
    </main>
  );
};

export default HomeComponents;
