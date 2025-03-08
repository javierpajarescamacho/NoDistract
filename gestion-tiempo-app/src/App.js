/*import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const recommendedTimes = {
  facebook: 120, // Tiempo recomendado en minutos
  instagram: 200,
  tiktok: 60, // Usamos "tiktok" como clave normalizada
  // Agrega más aplicaciones y sus tiempos recomendados aquí
};

const weeklyReductions = {
  facebook: 15, // Reducción semanal en minutos para Facebook
  instagram: 10, // Reducción semanal en minutos para Instagram
  tiktok: 5,    // Reducción semanal en minutos para TikTok
  // Agrega más aplicaciones y sus reducciones semanales aquí
};

const MAX_WEEKS = 20; // Máximo de semanas permitidas para la reducción

export default function App() {
  const [usage, setUsage] = useState([]);
  const [appName, setAppName] = useState("");
  const [timeSpent, setTimeSpent] = useState("");

  // Función para normalizar el nombre de la aplicación
  const normalizeAppName = (name) => {
    return name.toLowerCase().replace(/\s+/g, ""); // Convierte a minúsculas y elimina espacios
  };

  const addUsage = () => {
    if (appName && timeSpent) {
      const normalizedAppName = normalizeAppName(appName);
      setUsage([...usage, { app: appName, normalizedApp: normalizedAppName, time: parseInt(timeSpent) }]);
      setAppName("");
      setTimeSpent("");
    }
  };

  const clearData = () => {
    setUsage([]);
  };

  const getRecommendations = () => {
    if (usage.length === 0) return <p>Añade datos para recibir recomendaciones.</p>;
    
    const recommendations = usage.map((appUsage, index) => {
      const appKey = appUsage.normalizedApp; // Usamos la versión normalizada para las comparaciones
      const recommendedTime = recommendedTimes[appKey];
      const weeklyReduction = weeklyReductions[appKey];

      if (recommendedTime && weeklyReduction && appUsage.time > recommendedTime) {
        const totalReduction = appUsage.time - recommendedTime;
        let weeksNeeded = Math.ceil(totalReduction / weeklyReduction);
        let adjustedWeeklyReduction = weeklyReduction;

        // Si las semanas necesarias superan el máximo, ajustamos la reducción semanal
        if (weeksNeeded > MAX_WEEKS) {
          weeksNeeded = MAX_WEEKS;
          adjustedWeeklyReduction = Math.ceil(totalReduction / MAX_WEEKS);
        }

        return (
          <p key={index} className="mt-2">
            Intenta reducir el tiempo en {appUsage.app} en {adjustedWeeklyReduction} min cada semana por {weeksNeeded} semanas. Actualmente usas {appUsage.time} min (recomendado: {recommendedTime} min).
          </p>
        );
      }
      return null;
    }).filter(Boolean);

    return recommendations.length > 0 ? recommendations : <p>Tus tiempos de uso están dentro de lo recomendado.</p>;
  };

  return (
    <div className="p-5 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-3">Gestión de Tiempos en Aplicaciones</h1>
      <div className="flex gap-2 mb-3">
        <input 
          type="text" 
          placeholder="Nombre de la app" 
          value={appName} 
          onChange={(e) => setAppName(e.target.value)} 
          className="border p-2 rounded w-1/2"
        />
        <input 
          type="number" 
          placeholder="Tiempo en min" 
          value={timeSpent} 
          onChange={(e) => setTimeSpent(e.target.value)} 
          className="border p-2 rounded w-1/4"
        />
        <button onClick={addUsage} className="bg-blue-500 text-white px-3 py-2 rounded">Agregar</button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={usage}>
          <XAxis dataKey="app" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="time" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 font-semibold">
        {getRecommendations()}
      </div>
      <button 
        onClick={clearData} 
        className="bg-red-500 text-white px-3 py-2 rounded mt-4"
      >
        Borrar Datos
      </button>
    </div>
  );
} */

  import { useState, useEffect } from "react";
  import Card from '@mui/material/Card';
  import CardContent from '@mui/material/CardContent'; // Actualiza la importación de Card y Button si usas otro paquete
  import { Button } from "react-bootstrap"; // Cambia esto si usas otro paquete para los botones
  import { Home, BarChart3, Clock, Settings, Award, AlertCircle } from "lucide-react";
  
  // Mapeo de aplicaciones con sus logos
  const appIcons = {
    instagram: <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg" alt="Instagram" className="w-4 h-4" />,
    tiktok: <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/TikTok_logo_2018.svg" alt="TikTok" className="w-4 h-4" />,
    youtube: <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png" alt="YouTube" className="w-4 h-4" />,
    google: <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="w-4 h-4" />,
    whatsapp: <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-4 h-4" />,
    linkedin: <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/LinkedIn_Logo_2019.svg" alt="LinkedIn" className="w-4 h-4" />,
    game: <img src="https://upload.wikimedia.org/wikipedia/commons/4/46/Gamepad.svg" alt="Game" className="w-4 h-4" />,
  };
  
  const recommendedTimes = {
    instagram: 180,
    tiktok: 90,
    youtube: 150,
    google: 60,
    whatsapp: 120,
    linkedin: 80,
    game: 100,
  };
  
  export default function NoDistractHome() {
    const [usage, setUsage] = useState([]);
    const [selectedApp, setSelectedApp] = useState("instagram");
    const [selectedTime, setSelectedTime] = useState(1);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
    const addUsage = () => {
      const newUsage = { app: selectedApp, time: selectedTime, remainingTime: selectedTime * 3600 }; // tiempo en segundos
      setUsage([...usage, newUsage]);
    };
  
    // Función para convertir segundos a formato hh:mm:ss
    const formatTime = (seconds) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };
  
    // Función para simular el decremento del tiempo
    useEffect(() => {
      const intervalId = setInterval(() => {
        setUsage((prevUsage) =>
          prevUsage.map((entry) =>
            entry.remainingTime > 0
              ? { ...entry, remainingTime: entry.remainingTime - 1 }
              : entry
          )
        );
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, []);
  
    return (
      <div className="p-6 max-w-2xl mx-auto" style={{ backgroundColor: "#e0f7fa" }}>
        <h1 className="text-3xl font-bold mb-4">Bienvenido a NoDistract</h1>
        <p className="mb-6 text-gray-600">Toma el control de tu tiempo y reduce las distracciones digitales.</p>
  
        <Card className="mb-6">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Control de tiempo de uso</h2>
            <div className="flex gap-4 mb-3">
              {/* Dropdown personalizado */}
              <div className="relative">
                <button
                  className="p-2 border rounded flex items-center gap-2"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {appIcons[selectedApp]} {selectedApp.charAt(0).toUpperCase() + selectedApp.slice(1)}
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 bg-white border mt-2 rounded shadow-lg z-10">
                    {Object.keys(recommendedTimes).map((app) => (
                      <div
                        key={app}
                        className="p-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSelectedApp(app);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {appIcons[app]} {app.charAt(0).toUpperCase() + app.slice(1)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <select
                className="p-2 border rounded"
                value={selectedTime}
                onChange={(e) => setSelectedTime(parseInt(e.target.value))}
              >
                {[...Array(24).keys()].map((hour) => (
                  <option key={hour + 1} value={hour + 1}>{hour + 1} horas</option>
                ))}
              </select>
              <Button onClick={addUsage} className="bg-blue-500 text-white px-3 py-2 rounded">Agregar</Button>
            </div>
          </CardContent>
        </Card>
  
        {/* Mostrar las alertas y contadores de cada app con los logos */}
        <div className="mt-6">
          {usage.map((entry, index) => (
            <div key={index} className="mb-4 bg-red-200 p-4 rounded flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <div className="flex items-center gap-2">
                  {/* Logo de la app */}
                  {appIcons[entry.app]}
                  <span className="font-semibold text-red-600">{entry.app.charAt(0).toUpperCase() + entry.app.slice(1)}</span>
                </div>
              </div>
              <div>
                <p className="text-red-600">Tiempo asignado: {entry.time} horas</p>
                <p className="text-red-600">Tiempo restante: {formatTime(entry.remainingTime)}</p>
              </div>
            </div>
          ))}
        </div>
  
        <div className="flex justify-around mt-6">
          <Button variant="ghost" className="p-3 rounded-full bg-blue-100 hover:bg-blue-200">
            <Clock className="w-6 h-6 text-blue-600" />
          </Button>
  
          <Button variant="ghost" className="p-3 rounded-full bg-blue-100 hover:bg-blue-200">
            <BarChart3 className="w-6 h-6 text-blue-600" />
          </Button>
  
          <Button variant="ghost" className="p-3 rounded-full bg-blue-600 hover:bg-blue-700">
            <Home className="w-8 h-8 text-white" />
          </Button>
  
          <Button variant="ghost" className="p-3 rounded-full bg-blue-100 hover:bg-blue-200">
            <Settings className="w-6 h-6 text-blue-600" />
          </Button>
  
          <Button variant="ghost" className="p-3 rounded-full bg-blue-100 hover:bg-blue-200">
            <Award className="w-6 h-6 text-blue-600" />
          </Button>
        </div>
      </div>
    );
  }