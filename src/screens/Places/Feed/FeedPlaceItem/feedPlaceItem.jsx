import { View, Text, Image, TouchableOpacity } from 'react-native';

const FeedPlaceItem = ({ imageURL, title, description, likes }) => {
  return (
    <TouchableOpacity className="w-full rounded-lg bg-white mb-4">
      <Image
        source={{ uri: imageURL }}
        style={{ height: 300, width: '100%', resizeMode: 'cover' }}
        className="rounded-t-lg"
      />
      <View className="">
        <Text className="text-lg font-bold text-slate-600 mx-3 my-3 mb-1 leading-6">{title}</Text>
      </View>
      <View className="mx-3 mt-2 mb-3 pt-2 border-t-2 border-slate-200 flex-row">
        <Text className=" py-1 font-semibold text-slate-600 text-base mr-3">Curtir   |</Text>
        <Text className=" py-1 font-semibold text-slate-500 text-base">{likes}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FeedPlaceItem;