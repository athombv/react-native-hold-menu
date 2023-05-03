import { StyleSheet } from 'react-native';
import { MENU_WIDTH, MENU_WIDTH_MAX } from '../../constants';
import styleGuide from '../../styleGuide';

const styles = StyleSheet.create({
  menuWrapper: {
    position: 'absolute',
    left: 0,
    zIndex: 10,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    width: MENU_WIDTH - 32,
    maxWidth: MENU_WIDTH_MAX,
    marginHorizontal: 16,
    borderRadius: styleGuide.spacing * 1.5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    overflow: 'hidden',
    zIndex: 15,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,7)',
  },
  menuInnerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  menuItem: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: styleGuide.spacing * 2,
    paddingVertical: styleGuide.spacing * 1.25,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#DADAE2',
  },
  menuItemLast : {
    borderBottomWidth: 0,
    borderBottomColor: 'transparent',
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuItemText: {
    fontSize: styleGuide.typography.callout.fontSize,
    lineHeight: styleGuide.typography.callout.lineHeight,
    textAlign: 'left',
    width: '100%',
    flex: 1,
  },
  menuItemTitleText: {
    fontSize: styleGuide.typography.callout2.fontSize,
    lineHeight: styleGuide.typography.callout2.lineHeight,
    textAlign: 'center',
    width: '100%',
    flex: 1,
  },
  textDark: {
    color: 'black',
  },
  textLight: {
    color: 'white',
  },
});

export default styles;
