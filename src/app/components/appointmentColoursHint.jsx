import React from "react";
import HintWithStatus from "./hintWithStatus";

export default function AppointmentColoursHint(props) {

    const AppointmentColour = ({ color, label }) => (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
          <div
            style={{
              width: 12,
              height: 12,
              backgroundColor: color,
              marginRight: 6,
              borderRadius: 2,
            }}
          />
          <span>{label}</span>
        </div>
    );

    return(
        <HintWithStatus status="info">
            <div>
                Colores según el estado del turno:
                <div className="ml-2 md:ml-4 mt-2 flex flex-wrap space-x-3">
                  <div>
                    <AppointmentColour color="rgba(153, 102, 255, 1)" label="Reservado" />
                  </div>
                  <div>
                    <AppointmentColour color="rgba(255, 165, 0, 1)" label="Asignado" />
                  </div>
                  <div>
                    <AppointmentColour color="rgba(34, 193, 195, 1) " label="Confirmado" />
                  </div>
                  <div>
                    <AppointmentColour color="rgba(51, 178, 255, 1)" label="Atendido" />
                  </div>
                  <div>
                    <AppointmentColour color="rgba(220, 53, 69, 1)" label="Cancelado" />
                  </div>
                  <div>
                    <AppointmentColour color="rgba(155, 155, 155, 1)" label="Ausente" />
                  </div>
                </div>
            </div>
        </HintWithStatus>
    );
} 