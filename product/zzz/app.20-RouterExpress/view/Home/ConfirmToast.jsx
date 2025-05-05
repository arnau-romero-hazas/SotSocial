// src/components/ConfirmToast.js
import { toast } from "react-hot-toast";
import "./ConfirmToast.css"; // Importamos los estilos

export function showConfirmToast(message, onConfirm) {
    const toastId = toast(
        (t) => (
            <div className="confirm-toast">
                <p>{message}</p>
                <div className="confirm-toast-buttons">
                    <button className="confirm-btn" onClick={() => {
                        toast.dismiss(toastId);
                        onConfirm(); // Llamamos a la función de confirmación
                    }}>
                        Sí
                    </button>
                    <button className="cancel-btn" onClick={() => toast.dismiss(toastId)}>
                        Cancelar
                    </button>
                </div>
            </div>
        ),
        { duration: Infinity }
    );
}
