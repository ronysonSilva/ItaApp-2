import { useRoute } from '@react-navigation/native';

const MyComponent = () => {
  const route = useRoute();
  const { id } = route.params;

  // Use o ID para carregar dados dinâmicos

  return (
    <View>
      <h1 className='bg-red-500'>Detalhes do item {id}</h1>
    </View>
  );
};

export default MyComponent;
