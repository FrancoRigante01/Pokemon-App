import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play } from "lucide-react";

const MusicaFondo = () => {
  // Referencia al elemento de audio para poder controlarlo directamente
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Estado para saber si la música está silenciada o no
  const [muted, setMuted] = useState(false);

  // Estado para saber si ya se inició la música
  const [iniciado, setIniciado] = useState(false);

  // useEffect se ejecuta una sola vez al montar el componente
  useEffect(() => {
    // Crear nueva instancia de Audio con la música de fondo
    audioRef.current = new Audio("/musica.mp3");
    audioRef.current.loop = true;        // Repetir la música en bucle
    audioRef.current.volume = 0.05;      // Volumen inicial 
  }, []);

  // Función para iniciar la música (usada solo la primera vez)
  const iniciarMusica = () => {
    if (audioRef.current && !iniciado) {
      audioRef.current
        .play() // Intentar reproducir el audio
        .then(() => {
          setIniciado(true); // Si se reproduce con éxito, marcamos que ya fue iniciado
        })
        .catch((e) => {
          // Si hay un error (por ejemplo, restricciones del navegador)
          console.error("No se pudo reproducir la música:", e);
        });
    }
  };

  // Función para silenciar o activar el sonido
  const toggleMute = () => {
    if (audioRef.current) {
      // Cambiar el estado muteado del audio y del componente
      audioRef.current.muted = !audioRef.current.muted;
      setMuted(audioRef.current.muted);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 flex gap-2">
      {/* Botón para reproducir la música (solo visible si aún no comenzó) */}
      {!iniciado ? (
        <button
          onClick={iniciarMusica}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none transition-transform transform hover:scale-110"
          title="Reproducir música"
        >
          <Play className="w-8 h-8" />
        </button>
      ) : (
        // Botón para silenciar o activar sonido (visible cuando la música ya empezó)
        <button
          onClick={toggleMute}
          className="bg-white/20 backdrop-blur p-4 rounded-full text-white hover:bg-white/30 transition-transform transform hover:scale-110"
          title={muted ? "Activar música" : "Silenciar música"}
        >
          {muted ? (
            <VolumeX className="w-8 h-8" /> // Icono de silenciado
          ) : (
            <Volume2 className="w-8 h-8" /> // Icono de volumen activo
          )}
        </button>
      )}
    </div>
  );
};

export default MusicaFondo;
