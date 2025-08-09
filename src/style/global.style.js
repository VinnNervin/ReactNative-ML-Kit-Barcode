import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    overflow: 'scroll',
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
    justifyContent: 'space-between',
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
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonPurple: {
    backgroundColor: '#7f00ff',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
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
    padding: 12,
  },
  MaterialIconsBox: {
    width: 40,
    height: 40,
    borderRadius: 50,
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

  historyContainer: {
    // backgroundColor: 'red',

  },
  nothing: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  }
  ,
  historyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 0,
  },

  buttonCancel: {
    backgroundColor: '#d63031',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  }

});

export default styles;