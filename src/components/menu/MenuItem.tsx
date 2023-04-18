import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';

import Separator from './Separator';
import styles from './styles';

import { MenuItemProps } from './types';
import { useInternal } from '../../hooks';
import { CONTEXT_MENU_STATE } from '../../constants';
import isEqual from 'lodash.isequal';

type MenuItemComponentProps = {
  item: MenuItemProps;
  isLast?: boolean;
};

const MenuItemComponent = ({ item, isLast }: MenuItemComponentProps) => {
  const { state, menuProps } = useInternal();

  const handleOnPress = useCallback(() => {
    if (!item.isTitle) {
      const params = menuProps.value.actionParams[item.key] || [];
      if (item.onPress) item.onPress(...params);
      state.value = CONTEXT_MENU_STATE.END;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, item]);

  return (
    <>
      <TouchableOpacity
        key={item.key}
        onPress={handleOnPress}
        style={[styles.menuItem]}
      >
        <Animated.Text style={[styles.menuItemText, item.textProps]}>
          {item.text}
        </Animated.Text>
        {item.icon && item.icon()}
      </TouchableOpacity>
      {item.withSeparator && !isLast && <Separator />}
    </>
  );
};

const MenuItem = React.memo(MenuItemComponent, isEqual);
export default MenuItem;
