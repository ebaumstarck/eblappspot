
import logging
import os
import re
import webapp2
from google.appengine.ext.webapp import template

'''
class MainPage(webapp2.RequestHandler):
  def get(self, target=None):
    if not target:
      target = "home"
    path = os.path.join(
        os.path.dirname(__file__), "templates/%s.jinja" % target)
    self.response.out.write(template.render(path, {}))
'''
<<<<<<< HEAD
class MainPage(webapp2.RequestHandler):
=======
class GamesPage(webapp2.RequestHandler):
  def get(self):
    path = os.path.join(os.path.dirname(__file__), 'index.html')
    self.response.out.write(template.render(path, {}))

class SandBoxPage(webapp2.RequestHandler):
>>>>>>> 5bd72c0d2538b0ec7d129764f5f81994019789c9
  def get(self):
    path = os.path.join(os.path.dirname(__file__), 'index.html')
    self.response.out.write(template.render(path, {}))
'''
class ResumePage(webapp2.RequestHandler):
  def get(self):
    path = os.path.join(os.path.dirname(__file__), 'sandbox.html')
    self.response.out.write(template.render(path, {}))

class AjaxHandler(webapp2.RequestHandler):
  def post(self):
    self.response.write('Yes, I love you, %s!!!' % self.request.get("name"))

class ProgressPage(webapp2.RequestHandler):
  def get(self):
    path = os.path.join(os.path.dirname(__file__), 'ProgressPage.html')
    self.response.out.write(open(path, "r").read())
'''
app = webapp2.WSGIApplication([
    # (r'/(?P<target>\w*)', MainPage),
<<<<<<< HEAD
     ('/',MainPage),
=======
    ('/games', GamesPage),
    ('/', SandBoxPage),
>>>>>>> 5bd72c0d2538b0ec7d129764f5f81994019789c9
    # ('/loveping',AjaxHandler),
    # ('/progress',ProgressPage)
], debug=True)
