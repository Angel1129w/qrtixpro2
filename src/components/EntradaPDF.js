import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import QRCode from 'qrcode';

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    border: '1pt solid black',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#1a365d',
  },
  info: {
    fontSize: 12,
    marginBottom: 10,
  },
  qrCode: {
    alignSelf: 'center',
    marginTop: 20,
    width: 150,
    height: 150,
  },
});

// Componente para generar el PDF de las entradas
const EntradaPDF = ({ ventaData }) => {
  const [qrCodes, setQrCodes] = React.useState([]);

  React.useEffect(() => {
    const generarQRs = async () => {
      const codesPromises = Array(ventaData.cantidad).fill().map((_, index) => {
        const qrData = JSON.stringify({
          id: `${ventaData.cedula}-${index + 1}`,
          zona: ventaData.zona,
          fecha: ventaData.fecha,
        });
        return QRCode.toDataURL(qrData);
      });
      const codes = await Promise.all(codesPromises);
      setQrCodes(codes);
    };
    generarQRs();
  }, [ventaData]);

  return (
    <Document>
      {Array(ventaData.cantidad).fill().map((_, index) => (
        <Page key={index} size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.header}>Entrada QR-TixPro</Text>
            <Text style={styles.info}>Nombre: {ventaData.nombre}</Text>
            <Text style={styles.info}>Cédula: {ventaData.cedula}</Text>
            <Text style={styles.info}>Correo: {ventaData.correo}</Text>
            <Text style={styles.info}>Teléfono: {ventaData.telefono}</Text>
            <Text style={styles.info}>Dirección: {ventaData.direccion}</Text>
            <Text style={styles.info}>Zona: {ventaData.zona}</Text>
            <Text style={styles.info}>Precio: ${(ventaData.total / ventaData.cantidad).toLocaleString('es-CO')}</Text>
            <Text style={styles.info}>Fecha de compra: {new Date(ventaData.fecha).toLocaleDateString('es-CO')}</Text>
            <Text style={styles.info}>Entrada #{index + 1} de {ventaData.cantidad}</Text>
            {qrCodes[index] && (
              <Image
                style={styles.qrCode}
                src={qrCodes[index]}
              />
            )}
          </View>
        </Page>
      ))}
    </Document>
  );
};

export default EntradaPDF;