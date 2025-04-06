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
  mainContent: {
    marginBottom: 60,
  },
  contentRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  petImage: {
    width: 150,
    height: 150,
    marginRight: 20,
    objectFit: 'cover',
  },
  details: {
    flex: 1,
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1a365d',
    marginRight: 5,
  },
  value: {
    fontSize: 12,
    color: '#4a5568',
  },
  descriptionSection: {
    marginBottom: 15,
  },
  descriptionText: {
    fontSize: 10,
    lineHeight: 1.5,
    textAlign: 'justify',
    marginTop: 15,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statsText: {
    fontSize: 10,
    color: '#718096',
  },
  contactSection: {
    marginTop: 10,
  },
  contactText: {
    fontSize: 10,
    color: '#1a365d',
    fontWeight: 'bold',
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

const MyLostReport = ({ data }) => {
  return (
    <Document>
      {data.map((pet) => (
        <Page key={pet.id} size="A4" style={styles.page}>
          {/* Header */}
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

          {/* Main Content */}
          <View style={styles.mainContent}>
            {/* Pet Image and Basic Info */}
            <View style={styles.contentRow}>
              <Image
                style={styles.petImage}
                src={pet.image}
              />
              <View style={styles.details}>
                <View style={styles.detailItem}>
                  <Text style={styles.label}>Name:</Text>
                  <Text style={styles.value}>{pet.name}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.label}>Type:</Text>
                  <Text style={styles.value}>{pet.type}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.label}>Breed:</Text>
                  <Text style={styles.value}>{pet.breed}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.label}>Age:</Text>
                  <Text style={styles.value}>{pet.age} years</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.label}>Color:</Text>
                  <Text style={styles.value}>{pet.color}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.label}>Location:</Text>
                  <Text style={styles.value}>{pet.location}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.label}>Missing Since:</Text>
                  <Text style={styles.value}>
                    {format(new Date(pet.date), 'MM/dd/yyyy HH:mm')}
                  </Text>
                </View>
              </View>
            </View>

            {/* Description */}
            <View style={styles.descriptionSection}>
              <Text style={styles.label}>Description:</Text>
              <Text style={styles.descriptionText}>{pet.story}</Text>
            </View>

            {/* Stats */}
            <View style={styles.statsSection}>
              <Text style={styles.statsText}>Likes: {pet.likes}</Text>
              <Text style={styles.statsText}>Shares: {pet.shares}</Text>
              <Text style={styles.statsText}>Comments: {pet.comments}</Text>
            </View>

            {/* Contact Info */}
            <View style={styles.contactSection}>
              <Text style={styles.contactText}>Contact: {pet.email}</Text>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text>Here some details about your lost loved ones!</Text>
          </View>
        </Page>
      ))}
    </Document>
  );
};

export default MyLostReport;