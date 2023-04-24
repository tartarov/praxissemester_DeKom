import React, { useState } from 'react';
import Antragmenue from '../screens/MainScreenFlow/AntragListe';
import BottomDrawer from 'react-native-bottom-drawer-view';
import DokumenteButton from './Buttons/DokumentButton';
import { HeaderBottomdrawer } from './HeaderBottomDrawer';

function BottomDrawerScreen({navigation}) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <BottomDrawer
        containerHeight={600}
        offset={50}
        startUp={false}
        roundedEdges= {true}
        downDisplay= {600 / 1.09}
        shadow={true}
        onExpanded={()=>{
            setIsExpanded(true);
        }}
        onCollapsed={()=>{
            setIsExpanded(false);
        }}
    >
        {<Antragmenue navigation={navigation} isExpanded={isExpanded}/>}
        
    </BottomDrawer>
    );
}

export default BottomDrawerScreen;