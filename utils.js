import { createTheme } from '@mui/material/styles'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const newTheme = (theme) => createTheme({
  ...theme, 
  components: {
    MuiPickersDay: {
        styleOverrides: {
          root: {
            color: '#C1666B',
            borderRadius: 20,
            borderWidth: 0,
            borderColor: '#C1666B',
            border: '0px solid',
            backgroundColor: '#C1666B',
          }
        }
    },
    MuiPickersMonth: {
        styleOverrides: {
            root: {
              color: '#C1666B',
              borderRadius: 20,
              borderWidth: 0,
              borderColor: '#C1666B',
              border: '0px solid',
              backgroundColor: '#C1666B',
            },
            monthButton: {
                color: '#C1666B',
                borderRadius: 20,
                borderWidth: 0,
                borderColor: '#C1666B',
                border: '0px solid',
                backgroundColor: '#C1666B',
              }
        }
    }
  }
});

export function dateToString(str) {
    if (str === null || str === undefined)
        return "Sin fecha/Fecha invalida";
    const dt = typeof str === 'string' ? new Date(str) : str;
    const year  = dt.getFullYear();
    const month = (dt.getMonth() + 1).toString().padStart(2, "0");
    const day   = dt.getDate().toString().padStart(2, "0");
    const date = `${day}/${month}/${year}`;
    return date;
}

export const validPass = (pass) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  return regex.test(pass);
}

export const validEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

export const rolesList = [
  {
    label: 'Auditor',
    value: 'AUDITOR'
  },
  {
    label: 'Master admin',
    value: 'MASTERADMIN'
  },
  {
    label: 'Admin',
    value: 'ADMIN'
  },
  {
    label: 'Cliente',
    value: 'CLIENT'
  }
];

export const getSexOption = (value) => {
  return sexOptions.find(option => option.value === value) || null;
};

export const sexOptions = [
  {
      'label': 'Femenino',
      'value': 'female'
  },
  {
      'label': 'Masculino',
      'value': 'male'
  },
  {
    'label': 'Prefiero no decirlo',
    'value': 'none'
  }
];

export const appointmentTypes = [
  {
      'label': 'Virtual',
      'value': 'VIRTUAL'
  },
  {
      'label': 'Presencial',
      'value': 'PRESENTIAL'
  }
];

export const getAppointmentType = (type) => {
  let translatedType = '';
  switch (type) {
    case 'VIRTUAL': translatedType = 'Virtual';
      break;
      case 'PRESENTIAL': translatedType = 'Presencial';
      break;
    default:
      break;
  }
  return translatedType;
}

export const professions = [
  {
      'label': 'Nutrición',
      'value': 'nutrición'
  },
  {
      'label': 'Psicología',
      'value': 'psicología'
  }
];

export const weigthOptions = [
  {
      'label': 'Si',
      'value': 'yes'
  },
  {
      'label': 'No',
      'value': 'no'
  }
];

export const fertilityTraetmentOptions = [
  {
      'label': 'Si',
      'value': 'yes'
  },
  {
      'label': 'No',
      'value': 'no'
  },
  {
    'label': 'Estoy en vía de hacerlo',
    'value': 'in-progress'
  }
];

export const alimentationOptions = [
  {
      'label': 'Patron de alimentación Vegetariano',
      'value': 'vegetarian'
  },
  {
      'label': 'Patron de alimentación Vegano',
      'value': 'vegan'
  },
  {
    'label': 'Patron de alimentación Libre de Gluten',
    'value': 'gluten-free'
  },
  {
    'label': 'Patron de alimentación Libre de Lactosa',
    'value': 'lactose-free'
  },
  {
    'label': 'Dieta Cetogénica - KETO',
    'value': 'keto'
  },
  {
    'label': 'Ayuno intermitente',
    'value': 'intermitent'
  },
  {
    'label': 'Patron de alimentación Bajo en sodio',
    'value': 'low-sodium'
  },
  {
    'label': 'Sin restricciones de alimentos',
    'value': 'no-restrictions'
  },
  {
    'label': 'Otro',
    'value': 'other'
  }
];

export const serviceKnownOptions = [
  {
      'label': 'Me derivó otro profesional de la salud',
      'value': 'other-ptrofessional'
  },
  {
      'label': 'Recomendación de un familiar, amigo/a ó conocido/a',
      'value': 'recomendation'
  },
  {
    'label': 'Redes sociales (Instagram, Facebook, Tik Tok)',
    'value': 'social-media'
  },
  {
    'label': 'Página web',
    'value': 'web'
  }
];

export const appointmentReason = [
  {
      'label': 'Fertilidad y salud reproductiva',
      'value': 'Fertilidad y salud reproductiva'
  },
  {
      'label': 'Salud hormonal - Tiroides',
      'value': 'Salud hormonal - Tiroides'
  },
  {
    'label': 'Endometriosis - SOP - Alteración en ciclo menstrual',
    'value': 'Endometriosis - SOP - Alteración en ciclo menstrual'
  },
  {
    'label': 'Embarazo',
    'value': 'Embarazo'
  },
  {
    'label': 'SIBO - IMO - Candidiasis',
    'value': 'SIBO - IMO - Candidiasis'
  },
  {
    'label': 'Patologías digestivas',
    'value': 'Patologías digestivas'
  },
  {
    'label': 'Suplementación nutricional',
    'value': 'Suplementación nutricional'
  },
  {
    'label': 'Composición corporal (Antropometría - Bioimpedancia)',
    'value': 'Composición corporal (Antropometría - Bioimpedancia)'
  }
];

export const getRole = (role) => {
  const roles = {
    AUDITOR: 'AUDITOR',
    MASTERADMIN: 'MASTERADMIN',
    OPERATOR: 'PACIENTE',
    ADMIN: 'ADMIN'
  }
  return roles[role];
}

export const tableCustomStyles = {
    headRow: {
      style: {
        color:'black',
        backgroundColor: 'rgba(228, 226, 222, 1)'
      },
    },
    rows: {
      style: {
        maxHeight: '120px',
        color: "black",
        backgroundColor: "white"
      },
      stripedStyle: {
        color: "black",
        backgroundColor: "white"
      }
    },
    cells: {
      style: {
        '&:not(:last-of-type)': {
          borderRightStyle: 'solid',
          borderRightWidth: '1px',
          borderRightColor: 'rgba(0,0,0,.12)',
        },
      },
    },
    pagination: {
      style: {
        color:'black',
        backgroundColor: 'rgba(228, 226, 222, 1)',
        borderBottomLeftRadius: '10px !important',
        borderBottomRightRadius: '10px !important'
      },
      pageButtonsStyle: {
        borderRadius: '50%',
        height: '40px',
        width: '40px',
        padding: '8px',
        margin: 'px',
        cursor: 'pointer',
        transition: '0.4s',
        color: 'black !important',
        fill: 'black !important',
        backgroundColor: 'transparent',
        '&:disabled': {
          cursor: 'unset',
          color: 'grey',
          fill: 'grey',
        },
        '&:hover:not(:disabled)': {
          backgroundColor: 'white',
          color: 'grey',
          fill: 'grey',
        },
        '&:focus': {
          outline: 'none',
          backgroundColor: 'white',
        },
      },
    },
}

export function getFormatedDate(dtToFormat) {
  const dateToFormat = new Date(dtToFormat);
  let year  = dateToFormat.getFullYear();
  let month = (dateToFormat.getMonth() + 1).toString().padStart(2, "0");
  let day   = dateToFormat.getDate().toString().padStart(2, "0");
  var date = day + '/' + month + '/' + year;
  return date;
}

export function getFormatedCalendarDate(dtToFormat) {
  const dateToFormat = new Date(dtToFormat);
  let year = dateToFormat.getFullYear();
  let month = (dateToFormat.getMonth() + 1).toString().padStart(2, "0");
  let day = dateToFormat.getDate().toString().padStart(2, "0");
  let hours = dateToFormat.getHours().toString().padStart(2, "0");
  let minutes = dateToFormat.getMinutes().toString().padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes} HS`;
}

export function getAppointmentColorByStatus(status) {
  switch (status) {
      case 'reserved':
          return "rgba(153, 102, 255, 1)";
      case 'assigned':
          return "rgba(255, 165, 0, 1)";
      case 'confirmed':
          return "rgba(34, 193, 195, 1)";
      case 'attended':
          return "rgba(51, 178, 255, 1)";
      case 'cancelled':
          return "rgba(220, 53, 69, 1)";
      case 'absent':
          return "rgba(155, 155, 155, 1)";
      default:
          return "rgba(200, 200, 200, 1)";
  }
}

export function getOrderColorByStatus(status) {
  switch (status) {
      case 'cancelled':
          return "rgba(214, 11, 46, 0.8)";
      case 'invoiced':
          return "rgba(241, 217, 29, 0.8)";
      case 'personally_delivered':
          return "rgba(238, 103, 217, 0.8)";
      case 'to_deliver':
          return "rgba(27, 182, 184, 0.8)";
      case 'delivered':
          return "rgba(16, 177, 59, 0.8)";
      default:
          return "rgba(0, 0, 0, 0.44)";
  }
}

export const weekDays = [
  {
    label: 'Lunes',
    value: 'monday'
  },
  {
    label: 'Martes',
    value: 'tuesday'
  },
  {
    label: 'Miércoles',
    value: 'wednesday'
  },
  {
    label: 'Jueves',
    value: 'thursday'
  },
  {
    label: 'Viernes',
    value: 'friday'
  }
]

export function timeStringToDate(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return new Date(1970, 0, 1, hours, minutes);
}

function translatePatientField(key) {
  const translations = {
    firstName: 'Nombre',
    lastName: 'Apellido',
    fullName: "Nombre completo",
    email: 'Correo electrónico',
    document: 'Documento',
    phoneNumber: 'Teléfono',
    medicalCoverage: 'Cobertura médica',
    membershipNumber: 'Número de afiliado'
  };

  return translations[key] || key;
}

export const statusOptions = [
  { value: 'cancelled', label: 'Cancelado' },
  { value: 'invoiced', label: 'Facturado' },
  { value: 'personally_delivered', label: 'Entregado personalmente' },
  { value: 'to_deliver', label: 'A entregar' },
  { value: 'delivered', label: 'Entregado' }
];

export const formatDate = (date) => {
  // Convertir la fecha al formato deseado
  const optionsDate = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
  };
  const optionsTime = {
      hour: '2-digit',
      minute: '2-digit'
  };
  
  const datePart = new Date(date).toLocaleString('es-AR', optionsDate);
  const timePart = new Date(date).toLocaleString('es-AR', optionsTime);
  return `${datePart} - ${timePart}`;
};

export const formatDateWithoutTime = (date) => {
  // Convertir la fecha al formato deseado
  const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
  };
  return new Date(date).toLocaleString('es-AR', options);
};

export function exportEventsToExcel(dataArray, fileName = 'citas.xlsx') {
  const formatDateTime = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });
  };

  const transformedData = dataArray.map(event => {
    const { at, end, patient = {}, paymentFile = {}, notes } = event;

    return {
      'Fecha de la consulta': formatDateTime(at),
      ...Object.fromEntries(
        Object.entries(patient)
          .filter(([key]) => key !== 'firstTime')
          .map(([key, value]) => [
            translatePatientField(key),
            value
          ])
      ),
      'Tipo de consulta': getAppointmentType(event.type),
      'Lugar': event.location || '',
      'Motivo de la consulta': notes,
      'Requiere factura': paymentFile?.requireInvoice ? 'Sí' : 'No',
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(transformedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Events');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

  saveAs(blob, fileName);
}

export function exportOrdersToExcel(ordersArray, fileName = `Pedidos_pendientes_al_${formatDate(new Date())}.xlsx`) {
  const formatDateTime = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });
  };

  // Ordenar las órdenes alfabéticamente por ciudad
  const sortedOrders = [...ordersArray].sort((a, b) => {
    const cityA = (a.city || '').toLowerCase();
    const cityB = (b.city || '').toLowerCase();
    return cityA.localeCompare(cityB, 'es', { numeric: true });
  });

  const transformedData = sortedOrders.map(order => {
    const { orderedBy = {}, city, createdAt, items = [] } = order;

    const itemsDescription = items.map(item => {
      return `(Cantidad: ${item.quantity}) ${item.name} - Código: ${item.code}`;
    }).join('\n');

    return {
      'Ordenado por': orderedBy.fullName || '',
      'Ciudad': city || '',
      'Detalle de productos': itemsDescription,
      'Estado': statusOptions.find(opt => opt.value === order.status)?.label,
      'Fecha de creación': formatDateTime(createdAt),
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(transformedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Órdenes');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

  saveAs(blob, fileName);
}

export const categoryOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'tecnologia', label: 'Tecnología' },
  { value: 'fundas', label: 'Fundas' },
  { value: 'accesorios', label: 'Accesorios' },
];