/**
 * @name Edwin
 * @description
 * Date: 2014/10/1
 * Time: 23:05
 *
 */

(function ($) {
    var profilePackage = {

        __container: null,

        init: function (container) {
            var self = this
            self.__container = container

            var calendar = App.common.modules.calendar.init($('.custom-calendar-wrap', container), {
                selectedDay: {
                    1413907200000: true
                }
            })
        },

        __calendarClick: function () {

        }
    }

    $(function () {
        profilePackage.init($('.mod-package'))
        App.common.modules.profileLayout.init($('.mod-profile-header-wrap'))
        /* Calendar */
        /*var transEndEventNames, $wrapper, $calendar, cal, $month, $year;
         transEndEventNames = {
         'WebkitTransition': 'webkitTransitionEnd',
         'MozTransition': 'transitionend',
         'OTransition': 'oTransitionEnd',
         'msTransition': 'MSTransitionEnd',
         'transition': 'transitionend'
         };
         $wrapper = $('#custom-inner');
         $calendar = $('#calendar');
         cal = $calendar.calendario({
         onDayClick: function ($el, $contentEl, dateProperties) {

         if ($contentEl.length > 0) {
         showEvents($contentEl, dateProperties);
         }

         },
         caldata: '',
         displayWeekAbbr: true
         });
         $month = $('#custom-month').html(cal.getMonthName());
         $year = $('#custom-year').html(cal.getYear());

         $( '#custom-next' ).on( 'click', function() {
         cal.gotoNextMonth( updateMonthYear );
         } );
         $( '#custom-prev' ).on( 'click', function() {
         cal.gotoPreviousMonth( updateMonthYear );
         } );

         function updateMonthYear() {
         $month.html( cal.getMonthName() );
         $year.html( cal.getYear() );
         }

         // just an example..
         function showEvents( $contentEl, dateProperties ) {

         hideEvents();

         var $events = $( '<div id="custom-content-reveal" class="custom-content-reveal"><h4>Events for ' + dateProperties.monthname + ' ' + dateProperties.day + ', ' + dateProperties.year + '</h4></div>' ),
         $close = $( '<span class="custom-content-close"></span>' ).on( 'click', hideEvents );

         $events.append( $contentEl.html() , $close ).insertAfter( $wrapper );

         setTimeout( function() {
         $events.css( 'top', '0%' );
         }, 25 );

         }
         function hideEvents() {

         var $events = $( '#custom-content-reveal' );
         if( $events.length > 0 ) {

         $events.css( 'top', '100%' );
         Modernizr.csstransitions ? $events.on( transEndEventName, function() { $( this ).remove(); } ) : $events.remove();

         }

         }*/
    })


})(jQuery)