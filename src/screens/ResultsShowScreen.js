import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, FlatList, Image } from 'react-native';
import yelp from '../api/yelp';

const ResultsShowScreen = ( { navigation}) => {
    const [result, setResult] = useState(null);
    const id = navigation.getParam('id');
   
    const getResult = async(id) => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
   };

   useEffect(() => {
       getResult(id);
   }, []);

   if(!result) {
       return null;
   }

    return (
        <View>
            <Text style={{fontSize: 16, textAlign: 'center'}}>{result.name}</Text>
            <FlatList 
            data={result.photos}
            keyExtractor={(photo) => photo}
            renderItem={({ item }) => {
                return <Image style={styles.image}source={{ uri: item}}/>
            }}/>
        </View>
    );
};


const styles = StyleSheet.create({
    image: {
        alignSelf: 'center',
        marginVertical: 10,
        height: 200,
        width: 300
    }
});

export default ResultsShowScreen;