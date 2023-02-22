import { StyleSheet} from 'react-native';
import Navigation from './config/navigation/Navigation';
import { app } from './config/utils/firebase';

export default function App() {
  return (
    <Navigation/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
