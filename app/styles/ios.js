var cssVar = require('cssVar');

export default {

    // ------------------------------------------ form:

    loginInputWrapper: {
        marginBottom: 30,
        marginLeft: 20,
        marginRight: 20,
        borderBottomWidth : 0.5,
        borderBottomColor : '#B2B2B2',
        alignSelf: 'stretch'
    },

    loginButtonWrapper: {
        alignItems: 'center',
        paddingTop: 20
    },

    loginContainer: {
        paddingTop: 80,
        flex: 1,
    },

    loginInput: {
        height: 40,
    },


    // ------------------------------------------ btn:

    btnTouchable: {
        borderWidth: 0.5,
        borderColor: '#007AFF',
        paddingTop: 6,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 6
    },

    btnText: {
        color: '#007AFF',
        fontSize: 18
    },

    
    // ------------------------------------------ tab:

    tabContent: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    tabText: {
        margin: 50,
    },


    // ------------------------------------------ navbar:

    navBar: {
        backgroundColor   : '#F8F8F8',
        paddingTop        : 31,
        paddingBottom     : 1.5,
        borderBottomWidth : 0.5,
        borderBottomColor : '#B2B2B2'
    },

    navBarText: {
        marginVertical: 10,
        color      : '#000',
        textAlign  : 'center',
        fontWeight : '500',
        fontSize   : 18,
    },

    navBarTitleText: {
        marginVertical: 10,
        color      : '#000',
        textAlign  : 'center',
        fontWeight : '500',
        fontSize   : 18,
    },

    navBarButtonText: {
        color      : '#007AFF',
        fontSize   : 18,
        fontWeight : '400',
    },

    navBarLeftButton: {
        paddingLeft: 10,
        flexDirection: 'row',
    },

    navBarRightButton: {
        paddingRight: 10,
        flexDirection: 'row',
    },

    navBarButtonIcon: {
        width: 18,
        marginTop: 6,
        color: '#007AFF',
    },

    navBarButtonIconRight: {
        textAlign  : 'right',
    },


    // ------------------------------------------ images:

    imagePreview: {
        width: 300,
        height: 300
    },

    imagePreviewDescWrap: {
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15
    },

    imagePreviewUser: {
        fontWeight: '800'
    },

    imagePreviewDesc: {
        marginTop: 15
    },

    filterSelectThumbs: {
        alignSelf: 'stretch',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10
    },

    filterSelectThumb: {
        width: 80,
        height: 80,
        margin: 3
    },


    // ------------------------------------------ scroll grid:

    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 5,
    },

    item: {
        margin: 4,
        width: 95,
        height: 95,
    },

    // ------------------------------------------ scroll grid:

    loadingActivity: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        flex: 1,
    },
}