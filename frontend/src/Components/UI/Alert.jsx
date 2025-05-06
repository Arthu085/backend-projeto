// Componente de alerta
const Alert = ({ children, type = 'info', className = '' }) => {
  const alertTypes = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  };

  const alertStyle = alertTypes[type] || alertTypes.info;

  return (
    <div className={`p-4 border rounded-md ${alertStyle} ${className}`}>
      {children}
    </div>
  );
};

export default Alert;