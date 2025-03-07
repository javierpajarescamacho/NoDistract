import { useState } from "react";
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
}