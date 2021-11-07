var TodoList = (function() 
{
    var instance;

    function createInstance()
    {
        var list = new Array();
        return list;
    }

    return {
        getInstance: function()
        {
            if (!instance)
            {
                instance = createInstance();
            }

            return instance;
        }
    };

})();