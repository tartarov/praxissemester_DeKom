import React, { useState } from "react";
import { Dimensions } from "react-native";
import Antragmenue from "../screens/MainScreenFlow/AntragListe";
import BottomDrawer from "react-native-bottom-drawer-view";
import DokumenteButton from "./Buttons/DokumentButton";
import { HeaderBottomdrawer } from "./HeaderBottomDrawer";

function BottomDrawerScreen({ navigation }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { width } = Dimensions.get("screen");

  const SPACING = 10;
  const ITEM_WIDTH = width * 0.95;
  const ITEM_HEIGHT = ITEM_WIDTH * 0.8;
  const VISIBLE_ITEMS = 3;
//console.log("ITEM_HEIGHT --- " + (600/1.09) + "  " + (ITEM_HEIGHT*2.01) )
  return (
    <BottomDrawer
      containerHeight={ITEM_HEIGHT*2.01}
      offset={ITEM_HEIGHT/6}
      startUp={false}
      roundedEdges={true}
      downDisplay={ITEM_HEIGHT*1.86}
      shadow={true}
      onExpanded={() => {
        setIsExpanded(true);
      }}
      onCollapsed={() => {
        setIsExpanded(false);
      }}
    >
      {<Antragmenue navigation={navigation} isExpanded={isExpanded} />}
    </BottomDrawer>
  );
}

export default BottomDrawerScreen;
