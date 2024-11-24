import { Text , View} from "react-native";
import MapView , {PROVIDER_DEFAULT} from "react-native-maps";

const Map = () => {

    const region = {}

    return (
        <MapView 
            provider={PROVIDER_DEFAULT}
            style={{ flex: 1, width: '100%', height: '100%', borderRadius: 16 }}
            showsPointsOfInterest={false}
            mapType="mutedStandard"
            // initialRegion={region}
            showsUserLocation={true}
        >
            <Text></Text>
        </MapView>
    );
}

export default Map;