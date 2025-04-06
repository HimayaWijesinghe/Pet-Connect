import { Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  watermark: {
    position: 'absolute',
    left: 0,
    top: '40%',
    right: 0,
    bottom: 0,
    opacity: 0.15,
    transform: 'rotate(-30deg)',
    zIndex: -1,
  },
  watermarkText: {
    fontSize: 72,
    color: '#1a365d',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1a365d',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    color: '#718096',
    width: '30%',
  },
  value: {
    fontSize: 12,
    color: '#2d3748',
    width: '70%',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#718096',
    fontSize: 10,
  }
});

const SponserInvoice = ({ formData, petData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.watermark}>
        <Text style={styles.watermarkText}>PAID</Text>
      </View>
      
      <View style={styles.header}>
        <View>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1a365d' }}>Pet Connect</Text>
          <Text style={{ fontSize: 10, color: '#718096' }}>123 Animal Lane, Colombo, Sri Lanka</Text>
        </View>
        <Image
          style={{ width: 120, height: 120 }}
          src="/logo.png"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Invoice</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Invoice Date:</Text>
          <Text style={styles.value}>{format(new Date(), 'dd MMM yyyy')}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Transaction ID:</Text>
          <Text style={styles.value}>{`TX-${Math.floor(Math.random() * 1000000)}`}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Billed To</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{formData.cardName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{formData.email}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>
            {`${formData.street}, ${formData.city}, ${formData.state} ${formData.zip}, ${formData.country}`}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Pet Details</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Pet Name:</Text>
          <Text style={styles.value}>{petData?.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Breed:</Text>
          <Text style={styles.value}>{petData?.breed}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Sponsorship Type:</Text>
          <Text style={styles.value}>{petData?.type}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Payment Details</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Amount:</Text>
          <Text style={styles.value}>{`LKR ${petData?.amount?.toFixed(2)}`}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Payment Date:</Text>
          <Text style={styles.value}>{format(new Date(), 'dd MMM yyyy HH:mm')}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Payment Method:</Text>
          <Text style={styles.value}>Credit Card (**** **** **** {formData.cardNumber?.slice(-4)})</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text>Thank you for supporting animal welfare! This is an auto-generated invoice.</Text>
      </View>
    </Page>
  </Document>
);

export default SponserInvoice;