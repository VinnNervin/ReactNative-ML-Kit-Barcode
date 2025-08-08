import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#6c5ce7',
    paddingInline: 16,
    paddingVertical: 50,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#f0f0f0',
    marginTop: 8,
    fontSize: 14,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#fff',
    elevation: 4,
    marginHorizontal: 16,
    marginTop: -32,
    borderRadius: 16,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: '#888',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonPurple: {
    backgroundColor: '#7f00ff',
  },
  buttonGreen: {
    backgroundColor: '#00b894',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 8,
  },
  listContainer: {
    marginTop: 24,
    marginHorizontal: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  listSubtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    // borderRadius: 12,
    padding: 12,
    // marginBottom: 12,
    elevation: 1,
  },
  MaterialIconsBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemCode: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemName: {
    color: '#777',
    fontSize: 14,
  },
});

export default styles;